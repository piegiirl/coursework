/**
 * Интерфейс элемента кейса для CS Demo Case Opener.
 * @property {string} name - Название предмета.
 * @property {number} rarity - Редкость предмета (0-100,越高越稀有).
 */
interface CaseItem {
    name: string;
    rarity: number;
  }
  
  /**
   * Класс модели для CS Demo Case Opener.
   * Отвечает за генерацию полосы барабана на основе кейса.
   */
  export class CaseModel {
    private items: CaseItem[];
  
    constructor() {
      // Пример кейса с предметами
      this.items = [
        { name: "Нож", rarity: 1 },
        { name: "AK-47", rarity: 10 },
        { name: "M4A1-S", rarity: 20 },
        { name: "Пистолет", rarity: 50 },
        { name: "Перчатки", rarity: 5 },
      ];
    }
  
    /**
     * Генерирует полосу барабана для отображения в представлении.
     * @param {number} stopPosition - Позиция остановки (индекс предмета).
     * @param {number} stopPercentage - Процент ширины предмета, на котором остановится спин (0-1).
     * @param {number} stripLength - Количество предметов в полосе.
     * @returns {CaseItem[]} - Сгенерированная полоса предметов.
     */
    generateReelStrip(
      stopPosition: number,
      stopPercentage: number,
      stripLength: number
    ): CaseItem[] {
      if (stopPosition < 0 || stopPosition >= this.items.length) {
        throw new Error("Недопустимая позиция остановки");
      }
      if (stopPercentage < 0 || stopPercentage > 1) {
        throw new Error("Процент остановки должен быть между 0 и 1");
      }
  
      const strip: CaseItem[] = [];
      const totalItems = this.items.length;
  
      // Заполняем полосу случайными предметами до и после остановки
      for (let i = 0; i < stripLength; i++) {
        if (i === Math.floor(stripLength / 2)) {
          strip.push(this.items[stopPosition]);
        } else {
          const randomIndex = Math.floor(Math.random() * totalItems);
          strip.push(this.items[randomIndex]);
        }
      }
  
      return strip;
    }
  
    /**
     * Возвращает список всех предметов для отладки или проверки.
     * @returns {CaseItem[]} - Список предметов.
     */
    getItems(): CaseItem[] {
      return [...this.items];
    }
  }