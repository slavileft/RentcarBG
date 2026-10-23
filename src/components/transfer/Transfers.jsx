import styles from './Transfers.module.css';
import request from '../../utils/request';
import { useContext } from 'react';
import AuthContext from '../../context/auth-context';
import { toast } from 'sonner';

export default function Transfers() {
    const {accessToken} = useContext(AuthContext)

    async function handleTransferAction(formData) {
        const clientName = formData.get('clientName');
        const clientEmail = formData.get('clientEmail');
        const fromLocation = formData.get('fromLocation');
        const toLocation = formData.get('toLocation');

        const payload = {
            name: clientName,
            email: clientEmail,
            message: `ЗАЯВКА ЗА ТРАНСФЕР: От [${fromLocation}] до [${toLocation}].`
        };

        try {
            await request(import.meta.env.VITE_REST_URL, "/Contacts", "POST", payload, accessToken);

            toast.success("Вашата заявка за трансфер беше изпратена успешно! Ще се свържем с вас скоро.");
        } catch (error) {
            console.error("Грешка при изпращане на трансфера:", error);
            toast.error("Възникна грешка при изпращането. Моля, опитайте отново.");
        }
    }

    return (
        <main className="main-content">
            <section className={styles.transfersContainer}>
                
                <div className="section-title">
                    <h2>Заяви Трансфер</h2>
                    <p>Попълнете формата по-долу и нашият екип ще организира вашето пътуване</p>
                </div>

                <div className={styles.featuresGrid}>
                    <div className={styles.featureCard}>
                        <i className="fa-solid fa-plane-arrival"></i>
                        <h4>Airport Delivery</h4>
                        <p>Посрещане на терминала</p>
                    </div>
                    <div className={styles.featureCard}>
                        <i className="fa-solid fa-headset"></i>
                        <h4>24/7 Support</h4>
                        <p>Постоянно съдействие</p>
                    </div>
                    <div className={styles.featureCard}>
                        <i className="fa-solid fa-percent"></i>
                        <h4>No Hidden Taxes</h4>
                        <p>Прозрачни и крайни цени</p>
                    </div>
                    <div className={styles.featureCard}>
                        <i className="fa-solid fa-user-shield"></i>
                        <h4>Free Meet & Greet</h4>
                        <p>Помощ с личния багаж</p>
                    </div>
                </div>

                <div className={styles.formBox}>
                    <h3>Форма за индивидуална трансферна услуга</h3>
                    
                    <form action={handleTransferAction} className={styles.transferForm}>
                        
                        <div className={styles.formGroup}>
                            <label>Вашето Име</label>
                            <input 
                                type="text" 
                                name="clientName" 
                                placeholder="Име и фамилия" 
                                required 
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label>Електронна Поща</label>
                            <input 
                                type="email" 
                                name="clientEmail" 
                                placeholder="example@domain.com" 
                                required 
                            />
                        </div>

                        <div className={styles.routeGrid}>
                            <div className={styles.formGroup}>
                                <label><i className="fa-solid fa-location-dot"></i> От (Начална точка)</label>
                                <input 
                                    type="text" 
                                    name="fromLocation" 
                                    placeholder="напр. Летище София Т2, град, адрес..." 
                                    required 
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label><i className="fa-solid fa-flag"></i> До (Крайна дестинация)</label>
                                <input 
                                    type="text" 
                                    name="toLocation" 
                                    placeholder="напр. Боровец, Слънчев бряг, хотел..." 
                                    required 
                                />
                            </div>
                        </div>

                        <button type="submit" className={styles.btnSubmit}>
                            Изпрати заявка за трансфер
                        </button>
                    </form>
                </div>

            </section>
        </main>
    );
}
