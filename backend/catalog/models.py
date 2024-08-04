from django.db import models
from .generators import genres

# Create your models here.
QUALITY = (('good', 'Good'), ('bad', 'Bad'), ('regular', 'Regular'), ('excellent', 'Excellent'))
# GENRES = ((genre, genre) for genre in genres)


# def upload_to(instance, filename):
#     return f'books/{filename}'


class Author(models.Model):
    name = models.CharField(blank=False, null=False, max_length=100)

    def __str__(self):
        return self.name


class Genre(models.Model):
    genre = models.CharField(blank=False, null=False, max_length=100)

    def __str__(self):
        return self.genre


class Editorial(models.Model):
    name = models.CharField(blank=False, null=False, max_length=255)

    def __str__(self):
        return self.name


class Book(models.Model):
    title = models.CharField(blank=False, null=False, max_length=255)
    authors = models.ManyToManyField(Author, related_name='books')
    amount = models.IntegerField(blank=True, default=1)
    description = models.CharField(blank=False, null=False, max_length=300)
    quality = models.CharField(blank=False, null=False, choices=QUALITY, max_length=15)
    genres = models.ManyToManyField(Genre, related_name='books')
    details = models.CharField(blank=True, null=True, max_length=250)
    editorial = models.ForeignKey(blank=True, null=True, to=Editorial, on_delete=models.SET_NULL, related_name='books')
    language = models.CharField(blank=True, null=True, max_length=50)
    cover = models.ImageField(upload_to='books/', height_field=None, width_field=None, default='books/default.jpg')

    def __str__(self):
        return self.title
