package models

import (
	"errors"
	"fmt"
	"html"
	"strings"
	"time"

	"github.com/dottrip/fpt-swp/internal/database"
)

// Doctor represents a doctor in the system
type Doctor struct {
	ID                int       `json:"id"`
	Name              string    `json:"name"`
	Email             string    `json:"email"`
	Phone             string    `json:"phone"`
	Specialty         string    `json:"specialty"`
	Experience        string    `json:"experience"`
	Education         string    `json:"education"`
	Bio               string    `json:"bio"`
	Avatar            string    `json:"avatar"`
	LicenseNumber     string    `json:"license_number"`
	Address           string    `json:"address"`
	DateOfBirth       string    `json:"date_of_birth"`
	Gender            string    `json:"gender"`
	Status            string    `json:"status"` // active, on_leave, inactive
	Certifications    string    `json:"certifications"`
	WorkingHours      string    `json:"working_hours"` // JSON string for schedule
	ConsultationPrice int       `json:"consultation_price"`
	PatientCount      int       `json:"patient_count"`
	AppointmentCount  int       `json:"appointment_count"`
	CreatedAt         time.Time `json:"created_at"`
	UpdatedAt         time.Time `json:"updated_at"`
}

// DoctorRequest represents the request structure for creating/updating a doctor
type DoctorRequest struct {
	Name              string `json:"name"`
	Email             string `json:"email"`
	Phone             string `json:"phone"`
	Specialty         string `json:"specialty"`
	Experience        string `json:"experience"`
	Education         string `json:"education"`
	Bio               string `json:"bio"`
	Avatar            string `json:"avatar"`
	LicenseNumber     string `json:"license_number"`
	Address           string `json:"address"`
	DateOfBirth       string `json:"date_of_birth"`
	Gender            string `json:"gender"`
	Status            string `json:"status"`
	Certifications    string `json:"certifications"`
	WorkingHours      string `json:"working_hours"`
	ConsultationPrice int    `json:"consultation_price"`
}

// DoctorFilter represents filters for searching doctors
type DoctorFilter struct {
	Search    string `json:"search"`
	Specialty string `json:"specialty"`
	Status    string `json:"status"`
	Limit     int    `json:"limit"`
	Offset    int    `json:"offset"`
	SortBy    string `json:"sort_by"`
	SortOrder string `json:"sort_order"`
}

// BeforeSave is a hook that gets called before saving the doctor
func (d *Doctor) BeforeSave() error {
	// Sanitize fields
	d.Name = html.EscapeString(strings.TrimSpace(d.Name))
	d.Email = html.EscapeString(strings.TrimSpace(d.Email))
	d.Phone = html.EscapeString(strings.TrimSpace(d.Phone))
	d.Specialty = html.EscapeString(strings.TrimSpace(d.Specialty))
	d.LicenseNumber = html.EscapeString(strings.TrimSpace(d.LicenseNumber))

	// Set default status if empty
	if d.Status == "" {
		d.Status = "active"
	}

	return nil
}

// Validate validates the doctor data
func (d *Doctor) Validate() error {
	if d.Name == "" {
		return errors.New("name is required")
	}
	if d.Email == "" {
		return errors.New("email is required")
	}
	if d.Phone == "" {
		return errors.New("phone is required")
	}
	if d.Specialty == "" {
		return errors.New("specialty is required")
	}
	if d.LicenseNumber == "" {
		return errors.New("license number is required")
	}

	// Validate status
	validStatuses := []string{"active", "on_leave", "inactive"}
	isValidStatus := false
	for _, status := range validStatuses {
		if d.Status == status {
			isValidStatus = true
			break
		}
	}
	if !isValidStatus {
		return errors.New("status must be one of: active, on_leave, inactive")
	}

	return nil
}

// Create creates a new doctor in the database
func (d *Doctor) Create() error {
	if err := d.Validate(); err != nil {
		return err
	}
	if err := d.BeforeSave(); err != nil {
		return err
	}

	dbType := getEnv("DB_TYPE", "postgres")

	if dbType == "sqlite" {
		query := `
			INSERT INTO doctors (
				name, email, phone, specialty, experience, education, bio, avatar,
				license_number, address, date_of_birth, gender, status, certifications,
				working_hours, consultation_price, patient_count, appointment_count,
				created_at, updated_at
			) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
		`

		result, err := database.DB.Exec(query,
			d.Name, d.Email, d.Phone, d.Specialty, d.Experience, d.Education,
			d.Bio, d.Avatar, d.LicenseNumber, d.Address, d.DateOfBirth,
			d.Gender, d.Status, d.Certifications, d.WorkingHours, d.ConsultationPrice,
		)
		if err != nil {
			return err
		}

		id, err := result.LastInsertId()
		if err != nil {
			return err
		}
		d.ID = int(id)

		// Get the created timestamps
		selectQuery := `SELECT created_at, updated_at FROM doctors WHERE id = ?`
		err = database.DB.QueryRow(selectQuery, d.ID).Scan(&d.CreatedAt, &d.UpdatedAt)
		if err != nil {
			return err
		}
	} else {
		query := `
			INSERT INTO doctors (
				name, email, phone, specialty, experience, education, bio, avatar,
				license_number, address, date_of_birth, gender, status, certifications,
				working_hours, consultation_price
			) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
			RETURNING id, created_at, updated_at
		`

		err := database.DB.QueryRow(
			query,
			d.Name, d.Email, d.Phone, d.Specialty, d.Experience, d.Education,
			d.Bio, d.Avatar, d.LicenseNumber, d.Address, d.DateOfBirth,
			d.Gender, d.Status, d.Certifications, d.WorkingHours, d.ConsultationPrice,
		).Scan(&d.ID, &d.CreatedAt, &d.UpdatedAt)

		if err != nil {
			return err
		}
	}

	return nil
}

// GetAll retrieves doctors with filtering
func GetAllDoctors(filter DoctorFilter) ([]Doctor, error) {
	var doctors []Doctor
	dbType := getEnv("DB_TYPE", "postgres")

	// Build query
	query := "SELECT id, name, email, phone, specialty, experience, education, bio, avatar, license_number, address, date_of_birth, gender, status, certifications, working_hours, consultation_price, patient_count, appointment_count, created_at, updated_at FROM doctors WHERE 1=1"
	args := []interface{}{}
	argIndex := 1

	// Add filters
	if filter.Search != "" {
		if dbType == "sqlite" {
			query += " AND (name LIKE ? OR specialty LIKE ? OR email LIKE ?)"
			searchTerm := "%" + filter.Search + "%"
			args = append(args, searchTerm, searchTerm, searchTerm)
		} else {
			query += fmt.Sprintf(" AND (name ILIKE $%d OR specialty ILIKE $%d OR email ILIKE $%d)", argIndex, argIndex+1, argIndex+2)
			searchTerm := "%" + filter.Search + "%"
			args = append(args, searchTerm, searchTerm, searchTerm)
			argIndex += 3
		}
	}

	if filter.Specialty != "" {
		if dbType == "sqlite" {
			query += " AND specialty = ?"
		} else {
			query += fmt.Sprintf(" AND specialty = $%d", argIndex)
			argIndex++
		}
		args = append(args, filter.Specialty)
	}

	if filter.Status != "" {
		if dbType == "sqlite" {
			query += " AND status = ?"
		} else {
			query += fmt.Sprintf(" AND status = $%d", argIndex)
			argIndex++
		}
		args = append(args, filter.Status)
	}

	// Add ordering
	if filter.SortBy != "" {
		validSortFields := []string{"name", "specialty", "created_at", "patient_count", "appointment_count"}
		for _, field := range validSortFields {
			if filter.SortBy == field {
				sortOrder := "ASC"
				if filter.SortOrder == "desc" {
					sortOrder = "DESC"
				}
				query += fmt.Sprintf(" ORDER BY %s %s", field, sortOrder)
				break
			}
		}
	} else {
		query += " ORDER BY created_at DESC"
	}

	// Add pagination
	if filter.Limit > 0 {
		if dbType == "sqlite" {
			query += " LIMIT ?"
			if filter.Offset > 0 {
				query += " OFFSET ?"
				args = append(args, filter.Limit, filter.Offset)
			} else {
				args = append(args, filter.Limit)
			}
		} else {
			query += fmt.Sprintf(" LIMIT $%d", argIndex)
			args = append(args, filter.Limit)
			argIndex++
			if filter.Offset > 0 {
				query += fmt.Sprintf(" OFFSET $%d", argIndex)
				args = append(args, filter.Offset)
			}
		}
	}

	rows, err := database.DB.Query(query, args...)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var doctor Doctor
		err := rows.Scan(
			&doctor.ID, &doctor.Name, &doctor.Email, &doctor.Phone, &doctor.Specialty,
			&doctor.Experience, &doctor.Education, &doctor.Bio, &doctor.Avatar,
			&doctor.LicenseNumber, &doctor.Address, &doctor.DateOfBirth, &doctor.Gender,
			&doctor.Status, &doctor.Certifications, &doctor.WorkingHours,
			&doctor.ConsultationPrice, &doctor.PatientCount, &doctor.AppointmentCount,
			&doctor.CreatedAt, &doctor.UpdatedAt,
		)
		if err != nil {
			return nil, err
		}
		doctors = append(doctors, doctor)
	}

	return doctors, nil
}

// GetByID retrieves a doctor by ID
func GetDoctorByID(id int) (*Doctor, error) {
	doctor := &Doctor{}
	dbType := getEnv("DB_TYPE", "postgres")

	var query string
	if dbType == "sqlite" {
		query = `
			SELECT id, name, email, phone, specialty, experience, education, bio, avatar,
			license_number, address, date_of_birth, gender, status, certifications,
			working_hours, consultation_price, patient_count, appointment_count,
			created_at, updated_at
			FROM doctors WHERE id = ?
		`
	} else {
		query = `
			SELECT id, name, email, phone, specialty, experience, education, bio, avatar,
			license_number, address, date_of_birth, gender, status, certifications,
			working_hours, consultation_price, patient_count, appointment_count,
			created_at, updated_at
			FROM doctors WHERE id = $1
		`
	}

	err := database.DB.QueryRow(query, id).Scan(
		&doctor.ID, &doctor.Name, &doctor.Email, &doctor.Phone, &doctor.Specialty,
		&doctor.Experience, &doctor.Education, &doctor.Bio, &doctor.Avatar,
		&doctor.LicenseNumber, &doctor.Address, &doctor.DateOfBirth, &doctor.Gender,
		&doctor.Status, &doctor.Certifications, &doctor.WorkingHours,
		&doctor.ConsultationPrice, &doctor.PatientCount, &doctor.AppointmentCount,
		&doctor.CreatedAt, &doctor.UpdatedAt,
	)

	if err != nil {
		return nil, err
	}

	return doctor, nil
}

// Update updates a doctor in the database
func (d *Doctor) Update() error {
	if err := d.Validate(); err != nil {
		return err
	}
	if err := d.BeforeSave(); err != nil {
		return err
	}

	dbType := getEnv("DB_TYPE", "postgres")

	if dbType == "sqlite" {
		query := `
			UPDATE doctors SET
				name = ?, email = ?, phone = ?, specialty = ?, experience = ?,
				education = ?, bio = ?, avatar = ?, license_number = ?, address = ?,
				date_of_birth = ?, gender = ?, status = ?, certifications = ?,
				working_hours = ?, consultation_price = ?, updated_at = CURRENT_TIMESTAMP
			WHERE id = ?
		`

		_, err := database.DB.Exec(query,
			d.Name, d.Email, d.Phone, d.Specialty, d.Experience, d.Education,
			d.Bio, d.Avatar, d.LicenseNumber, d.Address, d.DateOfBirth,
			d.Gender, d.Status, d.Certifications, d.WorkingHours,
			d.ConsultationPrice, d.ID,
		)
		if err != nil {
			return err
		}

		// Get the updated timestamp
		selectQuery := `SELECT updated_at FROM doctors WHERE id = ?`
		err = database.DB.QueryRow(selectQuery, d.ID).Scan(&d.UpdatedAt)
		return err
	} else {
		query := `
			UPDATE doctors SET
				name = $1, email = $2, phone = $3, specialty = $4, experience = $5,
				education = $6, bio = $7, avatar = $8, license_number = $9, address = $10,
				date_of_birth = $11, gender = $12, status = $13, certifications = $14,
				working_hours = $15, consultation_price = $16, updated_at = NOW()
			WHERE id = $17
			RETURNING updated_at
		`

		err := database.DB.QueryRow(query,
			d.Name, d.Email, d.Phone, d.Specialty, d.Experience, d.Education,
			d.Bio, d.Avatar, d.LicenseNumber, d.Address, d.DateOfBirth,
			d.Gender, d.Status, d.Certifications, d.WorkingHours,
			d.ConsultationPrice, d.ID,
		).Scan(&d.UpdatedAt)

		return err
	}
}

// Delete deletes a doctor from the database
func (d *Doctor) Delete() error {
	dbType := getEnv("DB_TYPE", "postgres")

	var query string
	if dbType == "sqlite" {
		query = "DELETE FROM doctors WHERE id = ?"
	} else {
		query = "DELETE FROM doctors WHERE id = $1"
	}

	_, err := database.DB.Exec(query, d.ID)
	return err
}

// GetSpecialties returns list of all specialties
func GetDoctorSpecialties() ([]string, error) {
	var specialties []string
	dbType := getEnv("DB_TYPE", "postgres")

	var query string
	if dbType == "sqlite" {
		query = "SELECT DISTINCT specialty FROM doctors WHERE specialty != '' ORDER BY specialty"
	} else {
		query = "SELECT DISTINCT specialty FROM doctors WHERE specialty != '' ORDER BY specialty"
	}

	rows, err := database.DB.Query(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var specialty string
		if err := rows.Scan(&specialty); err != nil {
			return nil, err
		}
		specialties = append(specialties, specialty)
	}

	return specialties, nil
}
