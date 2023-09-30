FROM python:3.11.5-alpine
RUN pip install --upgrade pip
WORKDIR /mecenact
ADD . /mecenact/
RUN pip install -r requirements.txt
CMD ["python", "./BuildingApi/app.py"]