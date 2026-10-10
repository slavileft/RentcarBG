import styles from './SearchFilter.module.css';

export default function SearchFilter({ 
    selectedClass, 
    setSelectedClass, 
    selectedGear, 
    setSelectedGear 
}) {
    return (
        <div className={styles.filterBar}>
            
            {/* Филтър: Клас на колата */}
            <div className={styles.filterGroup}>
                <label>Клас автомобил:</label>
                <select 
                    value={selectedClass} 
                    onChange={(e) => setSelectedClass(e.target.value)}
                    className={styles.filterSelect}
                >
                    <option value="">Всички класове</option>
                    <option value="Луксозен">Луксозен</option>
                    <option value="Компактен">Компактен</option>
                    <option value="SUV">SUV</option>
                </select>
            </div>

            {/* Филтър: Скоростна кутия */}
            <div className={styles.filterGroup}>
                <label>Скоростна кутия:</label>
                <select 
                    value={selectedGear} 
                    onChange={(e) => setSelectedGear(e.target.value)}
                    className={styles.filterSelect}
                >
                    <option value="">Всички видове</option>
                    <option value="Автоматик">Автоматик</option>
                    <option value="Ръчна">Ръчна</option>
                </select>
            </div>
            
        </div>
    );
}