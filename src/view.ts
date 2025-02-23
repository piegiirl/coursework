import { CaseItem } from './model';

/**
 * Класс представления для CS Demo Case Opener.
 * Управляет отображением барабана и кнопки.
 */
export class CaseView {
  private reel: HTMLElement;
  private button: HTMLButtonElement;

  constructor() {
    this.reel = document.querySelector('.reel')!;
    this.button = document.querySelector('#spin-button')!;
  }

  /**
   * Рендерит полосу барабана в DOM.
   * @param {CaseItem[]} strip - Полоса предметов для отображения.
   */
  renderReel(strip: CaseItem[]): void {
    this.reel.innerHTML = '';
    strip.forEach((item) => {
      const div = document.createElement('div');
      div.className = 'reel-item';
      div.textContent = item.name;
      this.reel.appendChild(div);
    });
  }

  /**
   * Анимирует спин барабана до указанной позиции.
   * @param {number} stopPosition - Позиция остановки в пикселях.
   */
  spinReel(stopPosition: number): void {
    this.reel.style.transform = `translateX(-${stopPosition}px)`;
  }

  /**
   * Сбрасывает позицию барабана.
   */
  resetReel(): void {
    this.reel.style.transform = 'translateX(0)';
  }

  /**
   * Добавляет обработчик клика на кнопку.
   * @param {() => void} handler - Функция обработки клика.
   */
  bindSpinButton(handler: () => void): void {
    this.button.addEventListener('click', handler);
  }

  /**
   * Блокирует или разблокирует кнопку.
   * @param {boolean} disabled - Состояние кнопки.
   */
  toggleButton(disabled: boolean): void {
    this.button.disabled = disabled;
  }
}