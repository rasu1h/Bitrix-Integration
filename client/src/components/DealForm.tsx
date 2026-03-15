import { useState, FormEvent } from 'react';
import { DealFormData } from '../types';
// @ts-ignore
import styles from './DealForm.module.css';

interface Props {
  onSubmit: (data: DealFormData) => void;
  isLoading: boolean;
}

const GOAL_OPTIONS = [
  'Консультация',
  'Покупка продукта',
  'Техническая поддержка',
  'Партнёрство',
  'Другое',
];

const CITY_OPTIONS = [
  'Алматы',
  'Астана',
  'Шымкент',
  'Актобе',
  'Тараз',
  'Павлодар',
  'Другой город',
];

export function DealForm({ onSubmit, isLoading }: Props) {
  const [form, setForm] = useState<DealFormData>({ title: '', goal: '', city: '' });
  const [touched, setTouched] = useState<Record<keyof DealFormData, boolean>>({
    title: false,
    goal: false,
    city: false,
  });

  const errors: Partial<DealFormData> = {};
  if (!form.title.trim()) errors.title = 'Введите название сделки';
  if (!form.goal) errors.goal = 'Выберите цель обращения';
  if (!form.city) errors.city = 'Выберите город обращения';

  const isValid = Object.keys(errors).length === 0;

  const handleBlur = (field: keyof DealFormData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setTouched({ title: true, goal: true, city: true });
    if (!isValid) return;
    onSubmit(form);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      {/* Title */}
      <div className={styles.field}>
        <label className={styles.label} htmlFor="title">
          <span className={styles.labelIcon}>📋</span>
          Название сделки
          <span className={styles.required}>*</span>
        </label>
        <input
          id="title"
          type="text"
          className={`${styles.input} ${touched.title && errors.title ? styles.inputError : ''}`}
          placeholder="Например: Проект автоматизации склада"
          value={form.title}
          onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
          onBlur={() => handleBlur('title')}
          disabled={isLoading}
          autoComplete="off"
        />
        {touched.title && errors.title && (
          <span className={styles.errorMsg}>{errors.title}</span>
        )}
      </div>

      {/* Goal */}
      <div className={styles.field}>
        <label className={styles.label} htmlFor="goal">
          <span className={styles.labelIcon}>🎯</span>
          Цель обращения
          <span className={styles.required}>*</span>
        </label>
        <div className={styles.selectWrap}>
          <select
            id="goal"
            className={`${styles.select} ${touched.goal && errors.goal ? styles.inputError : ''}`}
            value={form.goal}
            onChange={(e) => setForm((p) => ({ ...p, goal: e.target.value }))}
            onBlur={() => handleBlur('goal')}
            disabled={isLoading}
          >
            <option value="">— Выберите цель —</option>
            {GOAL_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          <span className={styles.selectArrow}>▾</span>
        </div>
        {touched.goal && errors.goal && (
          <span className={styles.errorMsg}>{errors.goal}</span>
        )}
      </div>

      {/* City */}
      <div className={styles.field}>
        <label className={styles.label} htmlFor="city">
          <span className={styles.labelIcon}>🏙</span>
          Город обращения
          <span className={styles.required}>*</span>
        </label>
        <div className={styles.selectWrap}>
          <select
            id="city"
            className={`${styles.select} ${touched.city && errors.city ? styles.inputError : ''}`}
            value={form.city}
            onChange={(e) => setForm((p) => ({ ...p, city: e.target.value }))}
            onBlur={() => handleBlur('city')}
            disabled={isLoading}
          >
            <option value="">— Выберите город —</option>
            {CITY_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          <span className={styles.selectArrow}>▾</span>
        </div>
        {touched.city && errors.city && (
          <span className={styles.errorMsg}>{errors.city}</span>
        )}
      </div>

      <button
        type="submit"
        className={`${styles.btn} ${isLoading ? styles.btnLoading : ''}`}
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <span className={styles.spinner} />
            Создаём сделку…
          </>
        ) : (
          <>
            <span>Создать сделку</span>
            <span className={styles.btnArrow}>→</span>
          </>
        )}
      </button>
    </form>
  );
}
