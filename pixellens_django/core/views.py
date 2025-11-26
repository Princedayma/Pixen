from rest_framework import viewsets, status
from rest_framework.decorators import api_view, permission_classes, action
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from drf_spectacular.utils import extend_schema, OpenApiResponse, OpenApiParameter
from googleapiclient.discovery import build
from django.conf import settings
import re
from .models import User, Competition, CompetitionRegistration, Workshop, WorkshopRegistration, ServiceLead, PortfolioItem
from .serializers import (
    UserSerializer, CompetitionSerializer, CompetitionRegistrationSerializer,
    WorkshopSerializer, WorkshopRegistrationSerializer, ServiceLeadSerializer,
    PortfolioItemSerializer, RegistrationSerializer
)

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class CompetitionViewSet(viewsets.ModelViewSet):
    queryset = Competition.objects.all()
    serializer_class = CompetitionSerializer

class CompetitionRegistrationViewSet(viewsets.ModelViewSet):
    queryset = CompetitionRegistration.objects.all()
    serializer_class = CompetitionRegistrationSerializer

class WorkshopViewSet(viewsets.ModelViewSet):
    queryset = Workshop.objects.all()
    serializer_class = WorkshopSerializer

class WorkshopRegistrationViewSet(viewsets.ModelViewSet):
    queryset = WorkshopRegistration.objects.all()
    serializer_class = WorkshopRegistrationSerializer

class ServiceLeadViewSet(viewsets.ModelViewSet):
    queryset = ServiceLead.objects.all()
    serializer_class = ServiceLeadSerializer

class PortfolioItemViewSet(viewsets.ModelViewSet):
    queryset = PortfolioItem.objects.all()
    serializer_class = PortfolioItemSerializer

    @extend_schema(
        parameters=[
            OpenApiParameter(name='youtube_url', description='YouTube video URL', required=True, type=str),
        ],
        responses={
            200: {
                'type': 'object',
                'properties': {
                    'title': {'type': 'string'},
                    'description': {'type': 'string'},
                    'thumbnail': {'type': 'string'},
                    'video_id': {'type': 'string'},
                    'embed_url': {'type': 'string'},
                }
            },
            400: {'type': 'object', 'properties': {'error': {'type': 'string'}}},
        },
        summary='Fetch YouTube video metadata',
        description='Extract video ID from YouTube URL and fetch title, description, and thumbnail'
    )
    @action(detail=False, methods=['post'], permission_classes=[AllowAny])
    def fetch_youtube_data(self, request):
        """Fetch title, description, and thumbnail from YouTube URL."""
        youtube_url = request.data.get('youtube_url', '')
        
        if not youtube_url:
            return Response({'error': 'YouTube URL is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Extract video ID from various YouTube URL formats
        video_id = self.extract_youtube_id(youtube_url)
        
        if not video_id:
            return Response({'error': 'Invalid YouTube URL'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Get YouTube API key from settings
        api_key = getattr(settings, 'YOUTUBE_API_KEY', None)
        
        if not api_key:
            return Response({
                'error': 'YouTube API key not configured',
                'video_id': video_id,
                'embed_url': f'https://www.youtube.com/embed/{video_id}',
                'title': 'YouTube Video',
                'description': 'Please add title and description manually',
                'thumbnail': f'https://img.youtube.com/vi/{video_id}/maxresdefault.jpg'
            }, status=status.HTTP_200_OK)
        
        try:
            # Initialize YouTube API client
            youtube = build('youtube', 'v3', developerKey=api_key)
            
            # Fetch video details
            request_data = youtube.videos().list(
                part='snippet',
                id=video_id
            )
            response = request_data.execute()
            
            if not response.get('items'):
                return Response({'error': 'Video not found'}, status=status.HTTP_404_NOT_FOUND)
            
            video_data = response['items'][0]['snippet']
            
            return Response({
                'title': video_data['title'],
                'description': video_data['description'],
                'thumbnail': video_data['thumbnails']['high']['url'],
                'video_id': video_id,
                'embed_url': f'https://www.youtube.com/embed/{video_id}'
            }, status=status.HTTP_200_OK)
            
        except Exception as e:
            return Response({
                'error': f'Failed to fetch YouTube data: {str(e)}',
                'video_id': video_id,
                'embed_url': f'https://www.youtube.com/embed/{video_id}',
                'thumbnail': f'https://img.youtube.com/vi/{video_id}/maxresdefault.jpg'
            }, status=status.HTTP_200_OK)
    
    def extract_youtube_id(self, url):
        """Extract video ID from various YouTube URL formats."""
        patterns = [
            r'(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\?\/]+)',
            r'vid:([a-zA-Z0-9_-]+)',  # From Google search URLs
            r'youtube\.com\/shorts\/([^&\?\/]+)',
        ]
        
        for pattern in patterns:
            match = re.search(pattern, url)
            if match:
                return match.group(1)
        
        return None


@extend_schema(
    request=RegistrationSerializer,
    responses={201: RegistrationSerializer, 400: OpenApiResponse},
    summary='Register a new user'
)
@api_view(['POST'])
@permission_classes([AllowAny])
def register_view(request):
    serializer = RegistrationSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        return Response(RegistrationSerializer(user).data, status=201)
    return Response(serializer.errors, status=400)


@extend_schema(
    request={
        'application/json': {
            'type': 'object',
            'properties': {
                'username': {'type': 'string', 'example': 'user'},
                'password': {'type': 'string', 'example': 'password123'}
            },
            'required': ['username', 'password']
        }
    },
    responses={
        200: {
            'type': 'object',
            'properties': {
                'token': {'type': 'string', 'example': '9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b'}
            }
        },
        400: {
            'type': 'object',
            'properties': {
                'error': {'type': 'string', 'example': 'Invalid credentials'}
            }
        }
    },
    description='Obtain authentication token by providing valid username and password. Use this token in the Authorization header as: Token <your-token>',
    summary='Get API Authentication Token'
)
@api_view(['POST'])
@permission_classes([AllowAny])
def obtain_auth_token_view(request):
    """Authenticate user and return API token."""
    username = request.data.get('username')
    password = request.data.get('password')
    
    if not username or not password:
        return Response({'error': 'Username and password are required'}, status=400)
    
    user = authenticate(username=username, password=password)
    
    if user:
        token, created = Token.objects.get_or_create(user=user)
        return Response({'token': token.key}, status=200)
    
    return Response({'error': 'Invalid credentials'}, status=400)
