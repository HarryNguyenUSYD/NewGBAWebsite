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

export const factoryImages: {
  src: string;
  textEn: string;
  textVi: string;
}[] = [
    {
        src: "/backgrounds/factory-2.jpg",
        textEn: "Caption 1",
        textVi: "Caption 1"
    },
    {
        src: "/backgrounds/factory-1.jpg",
        textEn: "Caption 2",
        textVi: "Caption 2"
    },
    {
        src: "/backgrounds/factory-3.jpg",
        textEn: "Caption 3",
        textVi: "Caption 3"
    },
    {
        src: "/backgrounds/factory-4.jpg",
        textEn: "Caption 4",
        textVi: "Caption 4"
    },
    {
        src: "/backgrounds/factory-5.jpg",
        textEn: "Caption 5",
        textVi: "Caption 5"
    }
];

export const holidayImages: {
  src: string;
  labelEn: string,
  labelVn: string
}[] = [
    {
        src: "/backgrounds/holiday-1.jpg",
        labelEn: "Thailand - 2024",
        labelVn: "Thái Lan - 2024"
    },
    {
        src: "/backgrounds/holiday-2.jpg",
        labelEn: "Binh Chau - 2023",
        labelVn: "Bình Châu - 2023"
    }
]

export const boardOfDirectorsImages: {
  src: string;
  name: string;
  position: string;
}[] = [
  {
    src: "/bod/nguyen-phu-binh.jpg",
    name: "Nguyen Phu Binh",
    position: "Chairman",
  },
  {
    src: "/bod/hua-minh-do.jpg",
    name: "Hua Minh Do",
    position: "Construction Director",
  },
  {
    src: "/bod/nguyen-thi-thao.jpg",
    name: "Nguyen Thi Thao",
    position: "Project Director",
  },
  {
    src: "/bod/nguyen-the-viet-hung.jpg",
    name: "Nguyen The Viet Hung",
    position: "Design Director",
  },
  {
    src: "/bod/vo-van-hung.jpg",
    name: "Vo Van Hung",
    position: "Factory Manager",
  },
  {
    src: "/bod/nguyen-dang-thi.jpg",
    name: "Nguyen Dang Thi",
    position: "Project Management Lead",
  },
  {
    src: "/bod/nguyen-hoang-viet.jpg",
    name: "Nguyen Hoang Viet",
    position: "Purchasing Manager",
  },
  {
    src: "/bod/huynh-ngoc-van-thy.jpg",
    name: "Huynh Ngoc Van Thy",
    position: "Administration & HR Manager",
  },
  {
    src: "/bod/nguyen-thi-thanh-ha.jpg",
    name: "Nguyen Thi Thanh Ha",
    position: "Design Team Leader",
  },
  {
    src: "/bod/dinh-thi-hoan-my.jpg",
    name: "Dinh Thi Hoan My",
    position: "Chief Estimator",
  },
  {
    src: "/bod/doan-thi-ngoc-nuong.jpg",
    name: "Doan Thi Ngoc Nuong",
    position: "Chief Accountant",
  },
];
