import json

from django.db import transaction
from rest_framework.viewsets import ModelViewSet
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status
from . import models, serializers
from .utils import BookAlreadyExists


class BookViewSet(ModelViewSet):
    queryset = models.Book.objects.all()
    serializer_class = serializers.BookSerializer
    parser_classes = (MultiPartParser, FormParser)



    @transaction.atomic
    def create(self, request, *args, **kwargs):
        # print(request.data)
        # breakpoint()
        data = request.data.dict()
        authors_data = json.loads(data['authors'])
        newAuthors = [{'name': author} for author in authors_data if type(author) is str]
        existingAuthors = [author for author in authors_data if type(author) is int]
        if models.Book.objects.filter(title__exact=data['title']).filter(authors__in=existingAuthors).exists():
            raise BookAlreadyExists()
            # raise Exception('The book you are trying to create already exists.')
        genres = json.loads(data['genres'])
        editorial = data['editorial']
        data['authors'] = newAuthors
        print('data',data)
        serialized_book = self.get_serializer(data=data)
        print(serialized_book)
        serialized_book.is_valid(raise_exception=True)
        serialized_book.save(existingAuthors=existingAuthors, genres=genres, editorial=editorial)
        return Response(data=serialized_book.data, status=status.HTTP_201_CREATED)

    @transaction.atomic
    def update(self, request, *args, **kwargs):
        data = request.data.dict()
        instance = self.get_object()
        authors_data = json.loads(data['authors'])
        newAuthors = [{'name': author} for author in authors_data if type(author) is str]
        existingAuthors = [author for author in authors_data if type(author) is int]
        genres = json.loads(data['genres'])
        editorial = data['editorial']
        data['authors'] = newAuthors
        serialized_book = self.get_serializer(instance=instance, data=data)
        if serialized_book.is_valid(raise_exception=True):
            serialized_book.save(existingAuthors=existingAuthors, genres=genres, editorial=editorial)
            return Response(data=serialized_book.data, status=status.HTTP_200_OK)
        else:
            return Response(data=serialized_book.errors, status=status.HTTP_400_BAD_REQUEST)


class AuthorViewSet(ModelViewSet):
    queryset = models.Author.objects.all()
    serializer_class = serializers.AuthorSerializer


class EditorialViewSet(ModelViewSet):
    queryset = models.Editorial.objects.all()
    serializer_class = serializers.EditorialSerializer


class GenreViewSet(ModelViewSet):
    queryset = models.Genre.objects.all()
    serializer_class = serializers.GenreSerializer
