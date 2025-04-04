## Server sẽ chạy tại `http://localhost:3000`

- **Phản hồi:**
  ```json
  {
    "status": 200,
    "message": "...",
    "data": [...]
  }
  ```

## Danh sách API

### 1. Xử lý Like và Unlike Nhà Hàng

#### Like một nhà hàng

- **Endpoint:** `POST /api/like`
- **Body:**
  ```json
  {
    "userId": 1,
    "resId": 2
  }
  ```

#### Hủy Like một nhà hàng

- **Endpoint:** `POST /api/like/unlike`
- **Body:**
  ```json
  {
    "userId": 1,
    "resId": 2
  }
  ```

#### Lấy danh sách like theo nhà hàng

- **Endpoint:** `GET /api/like/restaurant/:id`

#### Lấy danh sách like theo user

- **Endpoint:** `GET /api/like/user/:id`

### 2. Xử lý Đánh Giá Nhà Hàng

#### Thêm đánh giá

- **Endpoint:** `POST /api/review/create`
- **Body:**
  ```json
  {
    "userId": 1,
    "resId": 2,
    "amount": 5
  }
  ```

#### Lấy danh sách đánh giá theo nhà hàng

- **Endpoint:** `GET /api/review/restaurant/:id`

#### Lấy danh sách đánh giá theo user

- **Endpoint:** `GET /api/review/user/:id`

### 3. Xử lý Đặt Món

#### Tạo đơn hàng

- **Endpoint:** `POST /api/order/create`
- **Body:**
  ```json
  {
    "userId": 1,
    "foodId": 3,
    "amount": 2,
    "code": "ORDER123",
    "arrSubId": "1,2"
  }
  ```

