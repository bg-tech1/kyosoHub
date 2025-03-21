# --- 開発用 ---
FROM golang:1.23-alpine as dev

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY . .

RUN go install github.com/air-verse/air@v1.61.7

CMD ["air"]

# --- ビルド用ステージ（本番） ---
FROM golang:1.23-alpine as builder

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY . .

RUN go build -o main ./main.go

# --- 最終ステージ（本番ランタイム） ---
FROM alpine:3.19 as prd

WORKDIR /app

COPY --from=builder /app/main .

EXPOSE 8080

CMD ["./main"]
