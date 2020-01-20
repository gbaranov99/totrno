# pull official base image
FROM python:3.8.1-alpine

RUN mkdir /code
WORKDIR /code

ARG MY_ENV

ENV MY_ENV=${MY_ENV} \
	PYTHONFAULTHANDLER=1 \
	PYTHONUNBUFFERED=1 \
	PYTHONHASHSEED=random \
	PIP_NO_CACHE_DIR=off \
	PIP_DISABLE_PIP_VERSION_CHECK=on \
	PIP_DEFAULT_TIMEOUT=100 \
	#POETRY_VERSION=0.12.17
	POETRY_VERSION=1.0.0

# System deps:
#RUN apk update \
#    && apk add --virtual build-deps libffi-dev gcc python3-dev musl-dev \
#    && apk add postgresql-dev \
#    && pip install psycopg2 \
#    && apk del build-deps

RUN apk add \
    bash \
    build-base \
    curl \
    gcc \
    gettext \
    git \
    libffi-dev \
    linux-headers \
    openssl \
    musl-dev \
    postgresql-dev \
    && pip install psycopg2

RUN pip install --upgrade pip
RUN pip install "poetry==$POETRY_VERSION"

# Creating folders, and files for a project:
COPY ./poetry.lock ./pyproject.toml /code/

# Project initialization:
RUN poetry config virtualenvs.create false \
	&& poetry install $(test "$MY_ENV" == production && echo "--no-dev") --no-interaction --no-ansi

COPY ./entrypoint.sh /code/entrypoint.sh
COPY ./static/ /code/static/

# run entrypoint.sh
ENTRYPOINT ["/code/entrypoint.sh"]
