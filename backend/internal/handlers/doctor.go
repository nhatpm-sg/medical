package handlers

import (
	"net/http"
	"strconv"

	"github.com/dottrip/fpt-swp/internal/models"
	"github.com/gin-gonic/gin"
)

// CreateDoctor handles POST /api/doctors
func CreateDoctor(c *gin.Context) {
	var req models.DoctorRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"error":   "Invalid JSON format: " + err.Error(),
		})
		return
	}

	// Create doctor instance from request
	doctor := &models.Doctor{
		Name:              req.Name,
		Email:             req.Email,
		Phone:             req.Phone,
		Specialty:         req.Specialty,
		Experience:        req.Experience,
		Education:         req.Education,
		Bio:               req.Bio,
		Avatar:            req.Avatar,
		LicenseNumber:     req.LicenseNumber,
		Address:           req.Address,
		DateOfBirth:       req.DateOfBirth,
		Gender:            req.Gender,
		Status:            req.Status,
		Certifications:    req.Certifications,
		WorkingHours:      req.WorkingHours,
		ConsultationPrice: req.ConsultationPrice,
	}

	// Create doctor
	if err := doctor.Create(); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"error":   err.Error(),
		})
		return
	}

	// Return success response
	c.JSON(http.StatusCreated, gin.H{
		"success": true,
		"message": "Doctor created successfully",
		"data":    doctor,
	})
}

// GetDoctors handles GET /api/doctors
func GetDoctors(c *gin.Context) {
	// Parse query parameters
	filter := models.DoctorFilter{
		Search:    c.Query("search"),
		Specialty: c.Query("specialty"),
		Status:    c.Query("status"),
		SortBy:    c.Query("sort_by"),
		SortOrder: c.Query("sort_order"),
	}

	// Parse limit and offset
	if limitStr := c.Query("limit"); limitStr != "" {
		if limit, err := strconv.Atoi(limitStr); err == nil {
			filter.Limit = limit
		}
	} else {
		filter.Limit = 20 // Default limit
	}

	if offsetStr := c.Query("offset"); offsetStr != "" {
		if offset, err := strconv.Atoi(offsetStr); err == nil {
			filter.Offset = offset
		}
	}

	// Get doctors
	doctors, err := models.GetAllDoctors(filter)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"error":   err.Error(),
		})
		return
	}

	// Return success response
	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"data":    doctors,
		"count":   len(doctors),
	})
}

// GetDoctor handles GET /api/doctors/{id}
func GetDoctor(c *gin.Context) {
	// Get ID from URL
	idStr := c.Param("id")

	id, err := strconv.Atoi(idStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"error":   "Invalid doctor ID",
		})
		return
	}

	// Get doctor
	doctor, err := models.GetDoctorByID(id)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"success": false,
			"error":   "Doctor not found",
		})
		return
	}

	// Return success response
	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"data":    doctor,
	})
}

// UpdateDoctor handles PUT /api/doctors/{id}
func UpdateDoctor(c *gin.Context) {
	// Get ID from URL
	idStr := c.Param("id")

	id, err := strconv.Atoi(idStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"error":   "Invalid doctor ID",
		})
		return
	}

	// Get existing doctor
	doctor, err := models.GetDoctorByID(id)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"success": false,
			"error":   "Doctor not found",
		})
		return
	}

	// Parse request body
	var req models.DoctorRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"error":   "Invalid JSON format: " + err.Error(),
		})
		return
	}

	// Update doctor fields
	doctor.Name = req.Name
	doctor.Email = req.Email
	doctor.Phone = req.Phone
	doctor.Specialty = req.Specialty
	doctor.Experience = req.Experience
	doctor.Education = req.Education
	doctor.Bio = req.Bio
	doctor.Avatar = req.Avatar
	doctor.LicenseNumber = req.LicenseNumber
	doctor.Address = req.Address
	doctor.DateOfBirth = req.DateOfBirth
	doctor.Gender = req.Gender
	doctor.Status = req.Status
	doctor.Certifications = req.Certifications
	doctor.WorkingHours = req.WorkingHours
	doctor.ConsultationPrice = req.ConsultationPrice

	// Update doctor
	if err := doctor.Update(); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"error":   err.Error(),
		})
		return
	}

	// Return success response
	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"message": "Doctor updated successfully",
		"data":    doctor,
	})
}

// DeleteDoctor handles DELETE /api/doctors/{id}
func DeleteDoctor(c *gin.Context) {
	// Get ID from URL
	idStr := c.Param("id")

	id, err := strconv.Atoi(idStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"error":   "Invalid doctor ID",
		})
		return
	}

	// Get existing doctor
	doctor, err := models.GetDoctorByID(id)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"success": false,
			"error":   "Doctor not found",
		})
		return
	}

	// Delete doctor
	if err := doctor.Delete(); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"error":   err.Error(),
		})
		return
	}

	// Return success response
	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"message": "Doctor deleted successfully",
	})
}

// GetDoctorSpecialties handles GET /api/doctors/specialties
func GetDoctorSpecialties(c *gin.Context) {
	// Get specialties
	specialties, err := models.GetDoctorSpecialties()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"error":   err.Error(),
		})
		return
	}

	// Return success response
	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"data":    specialties,
	})
}
