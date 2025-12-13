FROM python:3.11-slim

WORKDIR /app

# Install system dependencies for PostgreSQL support
# RUN apt-get update && apt-get install -y build-essential libpq-dev

# Copy dependency file
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the entire UserService source code
COPY . .

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8082"]
