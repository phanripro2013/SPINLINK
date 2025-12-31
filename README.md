
# TW Vũ Spin CoinsMaster – Production Ready App

Ứng dụng được thiết kế để cung cấp link vòng quay và xu miễn phí hàng ngày cho Coin Master, mang thương hiệu TW Vũ.

## 1. Cấu trúc thư mục
- `index.html`: Entry point & Styling.
- `index.tsx`: React Bootstrap.
- `App.tsx`: Logic trung tâm (Claim/Storage).
- `pages/`: Các màn hình (Home, Support, Admin).
- `components/`: UI re-usable (Navigation, Layout).

## 2. Hướng dẫn Build APK
1. **Prepare:** 
   Chạy lệnh build ứng dụng web của bạn để tạo thư mục `dist`.
2. **Capacitor Setup:**
   ```bash
   npm install @capacitor/core @capacitor/cli @capacitor/android
   npx cap init "TW Vũ Spin CoinsMaster" "com.twvu.coinsmaster"
   npx cap add android
   ```
3. **Android Studio:**
   - Chạy `npx cap open android`.
   - Trong Android Studio, vào `Build > Build Bundle(s) / APK(s) > Build APK(s)`.
   - File `.apk` sẽ nằm trong `app/build/outputs/apk/debug/`.
