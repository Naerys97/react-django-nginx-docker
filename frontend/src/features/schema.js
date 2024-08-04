import { schema } from "normalizr";

export const authorEntity = new schema.Entity(
    "authors", {}, { idAttribute: "id" }
);
export const genreEntity = new schema.Entity(
    "genres", {}, { idAttribute: "id" }
);
export const editorialEntity = new schema.Entity(
    "editorials", {}, { idAttribute: "id" }
);
export const bookEntity = new schema.Entity("books", {
    authors: [authorEntity],
    editorial: editorialEntity,
    genres: [genreEntity]
}, { idAttribute: "id" });