# Base image with Python and PyTorch (CUDA optional, use cpu-only if GPU not needed)
FROM python:3.10-slim


# Set working directory
WORKDIR /app

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy app code
COPY . .

# Expose port
EXPOSE 7860

# Run the app
CMD ["python", "app.py"]