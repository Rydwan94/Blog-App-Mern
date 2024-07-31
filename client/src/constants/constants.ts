interface CategoryCard {
    id: number;
    image: string;
    category: string;
  }

  interface CategoryInfoCard {
    category: string;
    content: string;
  }
  
  interface HomeData {
    id: number;
    mainCategory: string;
    image:string;
    categoryInfoCards: CategoryInfoCard[];
  }
  
  export const categoryCardData: CategoryCard[] = [
    {
      id: 0,
      image:
        "https://kit8.net/wp-content/uploads/edd/2021/12/delivery_by_scooter_preview.jpg",
      category: "dostawy",
    },
    {
      id: 1,
      image:
        "https://img.freepik.com/free-vector/product-quality-concept-illustration_114360-7461.jpg",
      category: "produkty",
    },
    {
      id: 2,
      image:
        "https://img.freepik.com/free-vector/flat-woman-paying-by-pos-terminal-refund-cashback_88138-785.jpg",
      category: "płatności",
    },
  ];



 export const dataHome: HomeData[] = [
    {
      id: 0,
      mainCategory: "produkty",
      image: "https://img.freepik.com/free-vector/product-quality-concept-illustration_114360-7461.jpg",
      categoryInfoCards: [
        {
          category: "Bestsellery",
          content: "Czym się cechuje produkt z potencjałem",
        },
        {
          category: "Jak znaleźć produkty z potencjałem",
          content: "Znajdz produkt z potencjałem",
        },
        {
          category: "Target",
          content: "Jak znaleźc grupę docelową",
        },
      ],
    },
    {
      id: 1,
      mainCategory: "dostawy",
      image: "https://static.vecteezy.com/system/resources/previews/002/027/546/original/illustration-of-delivery-man-deliver-to-customer-fast-and-secure-delivery-service-concept-vector.jpg",
      categoryInfoCards: [
        {
          category: "Różne metody dostaw",
          content: "Poznaj różne metody dostaw i wybierz najlepszą dla siebie",
        },
        {
          category: "Czas dostawy",
          content: "Jak skrócić czas dostawy produktów",
        },
        {
          category: "Koszty dostawy",
          content: "Jak optymalizować koszty dostawy",
        },
      ],
    },
    {
      id: 2,
      mainCategory: "płatności",
      image: "https://img.freepik.com/free-vector/flat-woman-paying-by-pos-terminal-refund-cashback_88138-785.jpg",
      categoryInfoCards: [
        {
          category: "Metody płatności",
          content: "Różne metody płatności dostępne dla klientów",
        },
        {
          category: "Bezpieczeństwo płatności",
          content: "Jak zapewnić bezpieczeństwo transakcji online",
        },
        {
          category: "Optymalizacja płatności",
          content: "Jak zoptymalizować procesy płatności",
        },
      ],
    },
  ];