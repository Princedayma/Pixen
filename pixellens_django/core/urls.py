from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    UserViewSet, CompetitionViewSet, CompetitionRegistrationViewSet,
    WorkshopViewSet, WorkshopRegistrationViewSet, ServiceLeadViewSet,
    PortfolioItemViewSet
)

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'competitions', CompetitionViewSet)
router.register(r'competition-registrations', CompetitionRegistrationViewSet)
router.register(r'workshops', WorkshopViewSet)
router.register(r'workshop-registrations', WorkshopRegistrationViewSet)
router.register(r'service-leads', ServiceLeadViewSet)
router.register(r'portfolio-items', PortfolioItemViewSet)


urlpatterns = [
    path('', include(router.urls)),
]
