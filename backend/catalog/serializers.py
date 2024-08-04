from rest_framework import serializers
from . import models


class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Author
        fields = '__all__'


class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Genre
        fields = '__all__'


class EditorialSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Editorial
        fields = '__all__'


# {'id': 1, 'authors': [OrderedDict([('id', 1), ('name', 'Kiera Cass')])], 'editorial': OrderedDict([('id', 1),
# ('name', 'HarperCollins')]), 'title': 'The Selection', 'amount': 3, 'description': "Maxon and America's Love
# Story", 'quality': '', 'details': 'Brand New', 'language': 'English', 'cover': '/media/books/default.jpg',
# 'genres': [16]}


# data= {'title':'Daddy Long Legs', 'amount':2, 'description':'Papaito', 'language':'English', 'details':'Shiny New',
# 'quality':'good', 'genres':[16] ,'authors':[{'name':'Jean Webster'}]}
class BookSerializer(serializers.ModelSerializer):
    authors = AuthorSerializer(many=True)
    genres = GenreSerializer(many=True, read_only=True)
    editorial = EditorialSerializer(read_only=True)

    class Meta:
        model = models.Book
        fields = '__all__'

    def create(self, validated_data):
        print(validated_data)
        authors = validated_data.pop('authors') + validated_data.pop('existingAuthors')
        editorial = validated_data.pop('editorial')
        genres = validated_data.pop('genres')

        book = models.Book.objects.create(**validated_data)
        # Adding Authors
        for author in authors:
            if type(author) is int:
                book.authors.add(author)
            else:
                book.authors.create(**author)
        # Adding Genres
        for genre in genres:
            book.genres.add(genre)
            # Adding Editorial
            models.Editorial.objects.get(pk=editorial).books.add(book)
        return book

    def update(self, instance, validated_data):
        eAuthors = validated_data['existingAuthors']
        authors = validated_data.pop('authors') + eAuthors
        editorial = validated_data['editorial']
        instanceAuthors = list(instance.authors.all())
        instance.title = validated_data.get('title', instance.title)
        instance.amount = validated_data.get('amount', instance.amount)
        instance.description = validated_data.get('description', instance.description)
        instance.quality = validated_data.get('quality', instance.quality)
        instance.details = validated_data.get('details', instance.details)
        instance.language = validated_data.get('language', instance.language)
        instance.cover = validated_data.get('cover', instance.cover)
        instance.save()
        # Updating Authors
        for a in instanceAuthors:
            if a.pk not in eAuthors:
                instance.authors.remove(a)
        for author in authors:
            if type(author) is int:
                instance.authors.add(author)
            else:
                instance.authors.create(**author)
        # Updating Genres
        instance.genres.clear()
        for genre in validated_data['genres']:
            instance.genres.add(genre)
        # Updating Editorial
        if not instance.editorial or instance.editorial.id != editorial:
            models.Editorial.objects.get(pk=editorial).books.add(instance)
        return instance
