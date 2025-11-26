from django.contrib import admin
from .models import User, Competition, CompetitionRegistration, Workshop, WorkshopRegistration, ServiceLead, PortfolioItem

admin.site.register(User)
admin.site.register(Competition)
admin.site.register(CompetitionRegistration)
admin.site.register(Workshop)
admin.site.register(WorkshopRegistration)
admin.site.register(ServiceLead)
admin.site.register(PortfolioItem)
