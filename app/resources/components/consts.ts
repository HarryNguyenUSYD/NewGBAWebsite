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
    },
    {
        src: "/backgrounds/holiday-4.jpg",
        labelEn: "Long Hai - 2023",
        labelVn: "Long Hải - 2023"
    },
    {
        src: "/backgrounds/holiday-3.jpg",
        labelEn: "Da Lat - 2020",
        labelVn: "Đà Lạt - 2020"
    }
]

export const boardOfDirectorsImages: {
  src: string;
  nameVi: string;
  nameEn: string;
  positionVi: string;
  positionEn: string;
}[] = [
  {
    src: "/bod/nguyen-phu-binh.jpg",
    nameVi: "Nguyễn Phú Bình",
    nameEn: "Nguyen Phu Binh",
    positionVi: "Chủ tịch Hội đồng thành viên",
    positionEn: "Chairman",
  },
  {
    src: "/bod/nguyen-the-viet-hung.jpg",
    nameVi: "Nguyễn Thế Việt Hưng",
    nameEn: "Nguyen The Viet Hung",
    positionVi: "Giám đốc thiết kế",
    positionEn: "Design Director",
  },
  {
    src: "/bod/hua-minh-do.jpg",
    nameVi: "Hứa Minh Độ",
    nameEn: "Hua Minh Do",
    positionVi: "Giám đốc thi công",
    positionEn: "Construction Director",
  },
  {
    src: "/bod/nguyen-thi-thao.jpg",
    nameVi: "Nguyễn Thị Thảo",
    nameEn: "Nguyen Thi Thao",
    positionVi: "Giám đốc dự án",
    positionEn: "Project Director",
  },
  {
    src: "/bod/huynh-ngoc-van-thy.jpg",
    nameVi: "Huỳnh Ngọc Vân Thy",
    nameEn: "Huynh Ngoc Van Thy",
    positionVi: "Trưởng bộ phận Hành chánh - Nhân sự",
    positionEn: "Administration & HR Manager",
  },
  {
    src: "/bod/nguyen-dang-thi.jpg",
    nameVi: "Nguyễn Đăng Thi",
    nameEn: "Nguyen Dang Thi",
    positionVi: "Trưởng bộ phận Quản lý dự án",
    positionEn: "Project Management Lead",
  },
  {
    src: "/bod/vo-van-hung.jpg",
    nameVi: "Võ Văn Hùng",
    nameEn: "Vo Van Hung",
    positionVi: "Quản đốc Xưởng",
    positionEn: "Factory Manager",
  },
  {
    src: "/bod/nguyen-thi-thanh-ha.jpg",
    nameVi: "Nguyễn Thị Thanh Hà",
    nameEn: "Nguyen Thi Thanh Ha",
    positionVi: "Trưởng bộ phận Thiết kế",
    positionEn: "Design Manager",
  },
  {
    src: "/bod/dinh-thi-hoan-my.jpg",
    nameVi: "Đinh Thị Hoàn Mỹ",
    nameEn: "Dinh Thi Hoan My",
    positionVi: "Trưởng bộ phận Dự toán",
    positionEn: "Estimation Manager",
  },
  {
    src: "/bod/doan-thi-ngoc-nuong.jpg",
    nameVi: "Đoàn Thị Ngọc Nương",
    nameEn: "Doan Thi Ngoc Nuong",
    positionVi: "Kế toán trưởng",
    positionEn: "Chief Accountant",
  },
  {
    src: "/bod/nguyen-hoang-viet.jpg",
    nameVi: "Nguyễn Hoàng Việt",
    nameEn: "Nguyen Hoang Viet",
    positionVi: "Trưởng bộ phận Vật tư",
    positionEn: "Purchasing Manager",
  },
];