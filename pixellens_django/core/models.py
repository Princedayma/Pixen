from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    ROLE_CHOICES = (
        ("ADMIN", "Admin"),
        ("MEMBER", "Member"),
    )
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default="MEMBER")
    instagram = models.CharField(max_length=255, blank=True, null=True)

class Competition(models.Model):
    STATUS_CHOICES = (
        ("UPCOMING", "Upcoming"),
        ("ONGOING", "Ongoing"),
        ("CLOSED", "Closed"),
    )
    title = models.CharField(max_length=255)
    description = models.TextField()
    theme = models.CharField(max_length=255)
    startDate = models.DateTimeField()
    endDate = models.DateTimeField()
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default="UPCOMING")
    isPaid = models.BooleanField(default=False)
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)

    def __str__(self):
        return self.title

class CompetitionRegistration(models.Model):
    STATUS_CHOICES = (
        ("SUBMITTED", "Submitted"),
        ("SHORTLISTED", "Shortlisted"),
        ("WINNER", "Winner"),
    )
    competition = models.ForeignKey(Competition, on_delete=models.CASCADE, related_name='registrations')
    name = models.CharField(max_length=255)
    email = models.EmailField()
    college = models.CharField(max_length=255)
    instagram = models.CharField(max_length=255, blank=True, null=True)
    submissionUrl = models.URLField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="SUBMITTED")

    def __str__(self):
        return f"{self.name} - {self.competition.title}"

class Workshop(models.Model):
    MODE_CHOICES = (
        ("ONLINE", "Online"),
        ("OFFLINE", "Offline"),
    )
    title = models.CharField(max_length=255)
    description = models.TextField()
    level = models.CharField(max_length=50)
    startDate = models.DateTimeField()
    endDate = models.DateTimeField()
    mode = models.CharField(max_length=10, choices=MODE_CHOICES)
    venue = models.CharField(max_length=255, blank=True, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    capacity = models.PositiveIntegerField()

    def __str__(self):
        return self.title

class WorkshopRegistration(models.Model):
    PAYMENT_STATUS_CHOICES = (
        ("PENDING", "Pending"),
        ("PAID", "Paid"),
    )
    workshop = models.ForeignKey(Workshop, on_delete=models.CASCADE, related_name='registrations')
    name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    paymentStatus = models.CharField(max_length=10, choices=PAYMENT_STATUS_CHOICES, default="PENDING")

    def __str__(self):
        return f"{self.name} - {self.workshop.title}"

class ServiceLead(models.Model):
    STATUS_CHOICES = (
        ("NEW", "New"),
        ("IN_PROGRESS", "In Progress"),
        ("CLOSED", "Closed"),
    )
    name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    projectType = models.CharField(max_length=100)
    budgetRange = models.CharField(max_length=100)
    eventDate = models.DateField()
    details = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="NEW")

    def __str__(self):
        return self.name

class PortfolioItem(models.Model):
    TYPE_CHOICES = (
        ("PHOTO", "Photo"),
        ("VIDEO", "Video"),
    )
    type = models.CharField(max_length=10, choices=TYPE_CHOICES)
    title = models.CharField(max_length=255)
    description = models.TextField()
    mediaUrl = models.URLField()
    thumbnailUrl = models.URLField(blank=True, null=True)
    category = models.CharField(max_length=100)
    createdBy = models.ForeignKey(User, on_delete=models.SET_NULL, blank=True, null=True, related_name='portfolio_items')

    def __str__(self):
        return self.title
