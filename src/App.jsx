import { useState } from "react";

export default function App() {
  // State สำหรับเก็บค่าจากฟอร์ม
  const [adults, setAdults] = useState("");
  const [children, setChildren] = useState("");
  const [drinkType, setDrinkType] = useState("refill"); // 'refill' | 'bottle'
  const [waterCount, setWaterCount] = useState("");
  const [sodaCount, setSodaCount] = useState("");
  const [discountRate, setDiscountRate] = useState("0"); // '0', '0.1', '0.15', '0.2'
  
  // State สำหรับผลลัพธ์และข้อความแจ้งเตือน
  const [totalPrice, setTotalPrice] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");

  // สลับประเภทเครื่องดื่ม
  const handleDrinkTypeChange = (type) => {
    setDrinkType(type);
    if (type === "refill") {
      // ถ้ารีฟิล ให้ล้างค่าช่องน้ำเปล่าและน้ำอัดลม
      setWaterCount("");
      setSodaCount("");
    }
  };

  // ฟังก์ชันคำนวณราคา
  const handleCalculate = (e) => {
    e.preventDefault();
    setErrorMsg("");

    // 1. Validate จำนวนผู้ใหญ่และเด็ก (ต้องกรอกอย่างน้อย 1 ช่อง หรือต้องเป็นตัวเลข >= 0)
    const adultNum = adults === "" ? 0 : Number(adults);
    const childNum = children === "" ? 0 : Number(children);

    if (adults === "" && children === "") {
      setErrorMsg("กรุณาป้อนจำนวนผู้ใหญ่ หรือจำนวนเด็กอย่างน้อย 1 ช่อง");
      return;
    }

    if (adultNum < 0 || childNum < 0 || isNaN(adultNum) || isNaN(childNum)) {
      setErrorMsg("จำนวนผู้ใหญ่และจำนวนเด็กต้องตั้งแต่ 0 ขึ้นไป");
      return;
    }

    if (adultNum === 0 && childNum === 0) {
      setErrorMsg("จำนวนผู้ใหญ่หรือจำนวนเด็กต้องมีอย่างน้อย 1 คน");
      return;
    }

    // 2. คำนวณค่าอาหารบุฟเฟต์ (ผู้ใหญ่ 299, เด็ก 89)
    const foodCost = adultNum * 299 + childNum * 89;

    // 3. คำนวณส่วนลด (ลดเฉพาะค่าอาหารทั้งหมด ไม่รวมเครื่องดื่ม)
    const discount = foodCost * Number(discountRate);
    const netFoodCost = foodCost - discount;

    // 4. คำนวณค่าเครื่องดื่ม
    let drinkCost = 0;
    if (drinkType === "refill") {
      // น้ำรีฟิล คนละ 29 บาท (ทั้งผู้ใหญ่และเด็ก)
      drinkCost = (adultNum + childNum) * 29;
    } else {
      // เครื่องดื่มแบบขวด
      const waterNum = waterCount === "" ? 0 : Number(waterCount);
      const sodaNum = sodaCount === "" ? 0 : Number(sodaCount);

      if (waterNum < 0 || sodaNum < 0 || isNaN(waterNum) || isNaN(sodaNum)) {
        setErrorMsg("จำนวนขวดเครื่องดื่มต้องตั้งแต่ 0 ขึ้นไป");
        return;
      }

      drinkCost = waterNum * 10 + sodaNum * 25;
    }

    // 5. รวมยอดชำระทั้งหมด
    const finalTotal = netFoodCost + drinkCost;
    setTotalPrice(finalTotal);
  };

  // ฟังก์ชันรีเซ็ตค่าทั้งหมดกลับเป็นค่าเริ่มต้น
  const handleReset = () => {
    setAdults("");
    setChildren("");
    setDrinkType("refill");
    setWaterCount("");
    setSodaCount("");
    setDiscountRate("0");
    setTotalPrice(0);
    setErrorMsg("");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-sans">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-6 sm:p-8">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Buffet Calculator</h1>
          <p className="text-sm text-gray-500 mt-1">คำนวณค่าอาหารบุฟเฟต์</p>

          {/* Logo ร้าน (เปลี่ยน src เป็นรูปโลโก้ของตัวเองได้) */}
          {/* Logo ร้าน */}
    <div className="mt-4 flex justify-center">
      <img
    src="/logo.png"
    alt="โลโก้ร้าน"
    className="w-16 h-16 rounded-full object-cover border border-orange-200 shadow-sm"
  />
</div>
        </div>

        {/* Form */}
        <form onSubmit={handleCalculate} className="space-y-4">
          {/* จำนวนผู้ใหญ่ */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              จำนวนผู้ใหญ่ (คนละ 299 บาท)
            </label>
            <input
              type="number"
              min="0"
              value={adults}
              onChange={(e) => setAdults(e.target.value)}
              placeholder=""
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* จำนวนเด็ก */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              จำนวนเด็ก (คนละ 89 บาท)
            </label>
            <input
              type="number"
              min="0"
              value={children}
              onChange={(e) => setChildren(e.target.value)}
              placeholder=""
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* กรอบเลือกเครื่องดื่ม */}
          <fieldset className="border border-gray-200 rounded-xl p-4 space-y-3">
            <legend className="text-xs font-medium text-gray-500 px-1">
              เครื่องดื่ม
            </legend>

            {/* ตัวเลือก 1: น้ำรีฟิล */}
            <label className="flex items-center space-x-2.5 cursor-pointer">
              <input
                type="radio"
                name="drinkType"
                value="refill"
                checked={drinkType === "refill"}
                onChange={() => handleDrinkTypeChange("refill")}
                className="w-4 h-4 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-800">
                น้ำรีฟิล คนละ 29 บาท (ผู้ใหญ่และเด็ก)
              </span>
            </label>

            {/* ตัวเลือก 2: เครื่องดื่มแบบขวด */}
            <label className="flex items-center space-x-2.5 cursor-pointer">
              <input
                type="radio"
                name="drinkType"
                value="bottle"
                checked={drinkType === "bottle"}
                onChange={() => handleDrinkTypeChange("bottle")}
                className="w-4 h-4 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-800">เครื่องดื่มแบบขวด</span>
            </label>

            {/* น้ำเปล่า */}
            <div className="pt-1">
              <label className="block text-xs text-gray-600 mb-1">
                น้ำเปล่า (ขวดละ 10 บาท)
              </label>
              <input
                type="number"
                min="0"
                disabled={drinkType === "refill"}
                value={waterCount}
                onChange={(e) => setWaterCount(e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg text-sm transition-colors ${
                  drinkType === "refill"
                    ? "bg-gray-200 border-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-white border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                }`}
              />
            </div>

            {/* น้ำอัดลม */}
            <div>
              <label className="block text-xs text-gray-600 mb-1">
                น้ำอัดลม (ขวดละ 25 บาท)
              </label>
              <input
                type="number"
                min="0"
                disabled={drinkType === "refill"}
                value={sodaCount}
                onChange={(e) => setSodaCount(e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg text-sm transition-colors ${
                  drinkType === "refill"
                    ? "bg-gray-200 border-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-white border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                }`}
              />
            </div>
          </fieldset>

          {/* บัตรส่วนลด */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              บัตรส่วนลด
            </label>
            <select
              value={discountRate}
              onChange={(e) => setDiscountRate(e.target.value)}
              className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="0">ไม่มีส่วนลด</option>
              <option value="0.1">ส่วนลด 10%</option>
              <option value="0.15">ส่วนลด 15%</option>
              <option value="0.2">ส่วนลด 20%</option>
            </select>
            <p className="text-xs text-gray-500 mt-1.5">
              ลดเฉพาะค่าอาหารทั้งหมด ไม่รวมเครื่องดื่ม
            </p>
          </div>

          {/* แจ้งเตือน Error (ถ้ามี) */}
          {errorMsg && (
            <div className="p-2.5 bg-red-50 border border-red-200 text-red-600 text-xs rounded-lg text-center font-medium">
              {errorMsg}
            </div>
          )}

          {/* ปุ่มคำนวณ และ รีเซ็ต */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="submit"
              className="w-full py-2.5 bg-[#4338ca] hover:bg-[#3730a3] text-white font-medium text-sm rounded-lg transition-colors cursor-pointer"
            >
              คำนวณ
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="w-full py-2.5 bg-[#ef4444] hover:bg-[#dc2626] text-white font-medium text-sm rounded-lg transition-colors cursor-pointer"
            >
              รีเซ็ต
            </button>
          </div>
        </form>

        {/* กล่องแสดงยอดชำระทั้งหมด */}
        <div className="mt-5 bg-[#eef2ff] rounded-xl py-4 px-4 text-center">
          <p className="text-base font-medium text-gray-800">
            ยอดชำระทั้งหมด:{" "}
            <span className="text-xl font-bold text-[#4338ca]">
              {totalPrice.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>{" "}
            บาท
          </p>
        </div>
      </div>
    </div>
  );
}