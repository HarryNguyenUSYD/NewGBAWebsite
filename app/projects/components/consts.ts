import { Dispatch, SetStateAction } from "react";

export const ITEMS_PER_PAGE = 10;

export type ProjectSearchProps = {
    name: string,
    setName: Dispatch<SetStateAction<string>>,
    order: string,
    setOrder: Dispatch<SetStateAction<string>>,
    excludeTypes: string[],
    setExcludeTypes: Dispatch<SetStateAction<string[]>>,
    handleSubmit: () => void
}

export const typesOption: {
  value: string;
  labelEn: string;
  labelVi: string;
}[] = [
  {
    value: "apartment",
    labelEn: "Apartment",
    labelVi: "Căn hộ",
  },
  {
    value: "bank",
    labelEn: "Bank",
    labelVi: "Ngân hàng",
  },
  {
    value: "consulate",
    labelEn: "Consulate",
    labelVi: "Lãnh sự quán",
  },
  {
    value: "education",
    labelEn: "Education",
    labelVi: "Giáo dục",
  },
  {
    value: "foodbeverage",
    labelEn: "Food & Beverage",
    labelVi: "Đồ ăn & thức uống",
  },
  {
    value: "hotelresort",
    labelEn: "Hotel & Resort",
    labelVi: "Khách sạn & Resort",
  },
  {
    value: "office",
    labelEn: "Office",
    labelVi: "Văn phòng",
  },
  {
    value: "shop",
    labelEn: "Shop",
    labelVi: "Cửa hàng",
  },
  {
    value: "showroom",
    labelEn: "Showroom",
    labelVi: "Phòng trưng bày",
  },
  {
    value: "others",
    labelEn: "Others",
    labelVi: "Khác",
  },
];