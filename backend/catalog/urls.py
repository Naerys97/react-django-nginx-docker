from rest_framework import routers
from . import viewsets

app_name = 'catalog'

router = routers.DefaultRouter()

router.register('books', viewsets.BookViewSet, basename='books')
router.register('genres', viewsets.GenreViewSet, 'genres')
router.register('editorials', viewsets.EditorialViewSet, 'editorials')
router.register('authors', viewsets.AuthorViewSet, 'authors')

urlpatterns = router.urls