FROM golang:latest

WORKDIR /app/backend

COPY backend/go.mod .
COPY backend/go.sum .
COPY backend/main.go .


RUN go mod download

COPY . .

EXPOSE 8880

CMD ["go", "run", "main.go"]
