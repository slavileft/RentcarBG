import { useContext, useState } from 'react';
import { Link } from 'react-router';
import { toast } from 'sonner';

import styles from './Reviews.module.css';
import AuthContext from '../../context/auth-context';
import useFetch from '../../hooks/useFetch';
import request from '../../utils/request';

export default function Reviews({ carId }) {
    const { data: reviews, isLoading, error } =
        useFetch(`/Reviews?carId=eq.${carId}&order=created_at.desc`, []);

    if (isLoading) {
        return <p className={styles.message}>Зареждане на отзивите...</p>;
    }

    if (error) {
        return <p className={`${styles.message} form-error`}>Не успяхме да заредим отзивите: {error}</p>;
    }

    // key={carId}: if the user opens another car, the section starts fresh
    return <ReviewsSection key={carId} carId={carId} initialReviews={reviews} />;
}

function ReviewsSection({ carId, initialReviews }) {
    const { isAuthenticated, user, accessToken } = useContext(AuthContext);

    const [reviews, setReviews] = useState(initialReviews);
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Calculated on every render, no extra state needed
    const average = reviews.length > 0
        ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
        : null;

    const hasReviewed = isAuthenticated && reviews.some(review => review.userId === user.id);

    const submitHandler = async (e) => {
        e.preventDefault();

        if (comment.trim().length < 5) {
            toast.error('Отзивът трябва да е поне 5 символа.');
            return;
        }

        setIsSubmitting(true);

        try {
            const [created] = await request(
                import.meta.env.VITE_REST_URL,
                '/Reviews',
                'POST',
                {
                    carId: Number(carId),
                    userId: user.id,
                    userName: user.email.split('@')[0],
                    rating,
                    comment: comment.trim(),
                },
                accessToken
            );

            setReviews([created, ...reviews]);
            setComment('');
            setRating(5);
            toast.success('Благодарим за отзива!');
        } catch (err) {
            toast.error(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const deleteHandler = async (reviewId) => {
        if (!window.confirm('Сигурни ли сте, че искате да изтриете отзива си?')) {
            return;
        }

        try {
            await request(
                import.meta.env.VITE_REST_URL,
                `/Reviews?id=eq.${reviewId}&userId=eq.${user.id}`,
                'DELETE',
                null,
                accessToken
            );

            setReviews(reviews.filter(review => review.id !== reviewId));
            toast.success('Отзивът е изтрит.');
        } catch (err) {
            toast.error(err.message);
        }
    };

    return (
        <section className={styles.reviews}>
            <div className={styles.header}>
                <h3>Отзиви</h3>
                {average && (
                    <span className={styles.average}>
                        ★ {average}{' '}
                        <small>({reviews.length} {reviews.length === 1 ? 'отзив' : 'отзива'})</small>
                    </span>
                )}
            </div>

            {!isAuthenticated && (
                <p className={styles.notice}>
                    <Link to="/login">Влезте в профила си</Link>, за да оставите отзив.
                </p>
            )}

            {hasReviewed && (
                <p className={styles.notice}>Вече сте оставили отзив за този автомобил.</p>
            )}

            {isAuthenticated && !hasReviewed && (
                <form className={styles.form} onSubmit={submitHandler}>
                    <label>Вашата оценка</label>
                    <div className={styles.ratingInput}>
                        {[1, 2, 3, 4, 5].map(n => (
                            <button
                                key={n}
                                type="button"
                                className={n <= rating ? styles.starOn : styles.starOff}
                                onClick={() => setRating(n)}
                                aria-label={`${n} от 5`}
                            >
                                ★
                            </button>
                        ))}
                    </div>

                    <label htmlFor="review-comment">Вашият отзив</label>
                    <textarea
                        id="review-comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        minLength={5}
                        maxLength={500}
                        placeholder="Как беше изживяването ви с този автомобил?"
                        required
                    />

                    <button type="submit" className={styles.btnSubmit} disabled={isSubmitting}>
                        {isSubmitting ? 'Изпращане...' : 'Публикувай отзива'}
                    </button>
                </form>
            )}

            {reviews.length === 0 ? (
                <p className={styles.message}>Все още няма отзиви за този автомобил.</p>
            ) : (
                <ul className={styles.list}>
                    {reviews.map(review => (
                        <li key={review.id} className={styles.item}>
                            <div className={styles.itemHeader}>
                                <strong>{review.userName}</strong>
                                <Stars value={review.rating} />
                                <span className={styles.date}>
                                    {new Date(review.created_at).toLocaleDateString('bg-BG')}
                                </span>
                            </div>

                            <p>{review.comment}</p>

                            {isAuthenticated && review.userId === user.id && (
                                <button
                                    className={styles.btnDelete}
                                    onClick={() => deleteHandler(review.id)}
                                >
                                    <i className="fa-solid fa-trash-can"></i> Изтрий
                                </button>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}

function Stars({ value }) {
    return (
        <span className={styles.stars}>
            {'★'.repeat(value)}{'☆'.repeat(5 - value)}
        </span>
    );
}