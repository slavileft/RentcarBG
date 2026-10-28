# RENTCAR.bg

A single-page car rental application built with React. Visitors can browse the fleet,
search by dates, see only the cars that are free for the chosen period,
and read reviews. Registered users can reserve a car, manage their reservations, and
leave reviews.

**Live demo:** https://rentcarbg.st-lefterov.workers.dev/

> The interface is in Bulgarian.
> Example user: st.lefterov@abv.bg
> Example user pass: 123456

## Features

- Fleet catalog with filters (class, gearbox) and a search by dates
- Car details page with price calculation and availability check
- Special offers page (cars with promotional prices)
- Registration, login and logout
- Reservations: create, view, edit dates (with overlap check) and cancel
- Reviews on every car: rating and comment, only the author can delete a review
- Transfers and contact forms
- Route guards: private pages for logged-in users, login/register for guests only
- Loading, error and empty states on every page that loads data

## Tech stack

| Area | Technology |
|---|---|
| UI | React 19, React Router 8 |
| Build tool | Vite |
| Backend | Supabase |
| Notifications | Sonner (toasts) |

## Getting started

Requirements: a recent LTS version of Node.js and npm.

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd rentcarbg
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. To use your own Supabase project, copy `.env.example` to `.env.local`
   and fill in your values; `.env.local` takes priority over `.env`.
4. Start the development server:
   ```bash
   npm run dev
   ```
   The app is available at `http://localhost:5173`.

Other scripts:

| Command | What it does |
|---|---|
| `npm run build` | Creates the production build in `dist/` |
| `npm run preview` | Serves the production build locally |
| `npm run lint` | Runs ESLint (the project has no warnings or errors) |

### Environment variables

| Variable | Description |
|---|---|
| `VITE_API_KEY` | Supabase **publishable (anon)** key. |
| `VITE_REST_URL` | `https://<project-ref>.supabase.co/rest/v1` |
| `VITE_AUTH_URL` | `https://<project-ref>.supabase.co/auth/v1` |

### Database

The app uses four tables in the `public` schema: `Cars` (fleet), `Reservations`
(`carId`, `location`, `startDate`, `endDate`, `totalPrice`, `userId`), `Reviews`
(`carId`, `userId`, `userName`, `rating`, `comment`) and `Contacts` (messages from the
contact and transfer forms). Row Level Security is enabled; see section 6 of the guide.

## Project structure

```
src/
├── api/            Supabase Auth requests (register, login, logout)
├── components/     One folder per page or feature, each with its own CSS Module
│   ├── guards/     AuthGuard and GuestGuard (route protection)
│   ├── reviews/    Reviews list and form on the car page
│   └── ...         catalog, car-details, my-reservations, edit-reservation, etc.
├── context/        AuthContext and AuthProvider
├── hooks/          useFetch, usePersistedState
├── utils/          request (fetch wrapper with error handling), reservations (overlap check)
├── App.jsx         Route definitions
├── main.jsx        Entry point
└── style.css       Global styles and CSS variables
```

**Architecture in short.** `AuthProvider` keeps the session and exposes it through
Context. Pages load their data with the `useFetch` hook, which returns
`{ data, isLoading, error }` so every page can show loading and error states.
All network calls go through `utils/request.js`, which attaches the API key and the
user's token, turns server and network failures into readable messages, and logs
the user out when the token has expired.

# Functional Guide

## 1. Project Overview

- **Application name:** RENTCAR.bg
- **Category:** Booking system (car rental)
- **Main purpose:** The application lets customers of a car rental company browse the
  fleet, check which cars are free for specific dates, and book them online. It
  replaces phone and email back-and-forth with a self-service reservation flow, and
  lets customers manage their own reservations and share reviews about the cars.

## 2. User Access & Permissions

**Guest (not authenticated)**

- Available pages: `/` (home with search), `/cars` (catalog), `/cars/:carId` (details),
  `/offers`, `/transfers`, `/contacts`, `/about`, `/terms`, `/login`, `/register`.
- Public data shown: the car catalog, car details with availability and price,
  promotional offers, reviews of every car, and the three latest reviews on the About
  page. Guests can also send a message through the contact and transfer forms.
- A guest can see the price and the booking form on a car's page but cannot confirm:
  the button is replaced with a link to the login page.

**Authenticated user**

- Main sections: everything a guest sees, plus "My reservations" (`/reservations`).
- Details pages: the car page shows the confirm button and the review form.
- Create / edit / delete: create a reservation, edit the dates of their own
  reservation (`/reservations/:reservationId/edit`), cancel their own reservation,
  write one review per car, and delete their own reviews.
- Logged-in users are redirected away from `/login` and `/register`.

## 3. Authentication & Session Handling

**Authentication flow**

1. When the app loads, `AuthProvider` reads the saved session from `localStorage`.
   If one exists, the user is treated as logged in immediately (`isAuthenticated`
   is true when there is an access token).
2. Register and login send the credentials to Supabase Auth. On success the returned
   session (access token and user) is stored in Context and `localStorage`, and the
   user is redirected to the home page. Errors (wrong password, existing email) are
   shown inline in the form.
3. Logout clears the session locally first, so it always succeeds, then asks Supabase
   to end the session. A failure of that second step is ignored on purpose.
4. If any request with a token is answered with 401 (expired session), `request.js`
   removes the saved session and redirects to the login page.

**Session persistence**

- The session is held in Context (`AuthContext`) and saved in `localStorage` under the
  key `auth` by the custom hook `usePersistedState`.
- After a refresh, the hook restores the value before the first render, so the user
  stays logged in and route guards do not flash a redirect. Broken or unavailable
  storage is handled with `try/catch`, and the user simply starts logged out.

## 4. Routing Structure

**Route guards logic**

Two guard components are used as layout routes with `<Outlet />`:

- `AuthGuard` wraps private routes (`/reservations`, `/reservations/:reservationId/edit`)
  and redirects guests to `/login`.
- `GuestGuard` wraps `/login` and `/register` and redirects logged-in users to `/`.

**Main routes**

11 top-level pages: `/`, `/cars`, `/transfers`, `/offers`, `/contacts`, `/about`,
`/terms`, `/logout`, `/login`, `/register`, `/reservations`, plus a catch-all `*`
route that renders a 404 page.

**Nested and parameterized routes**

- Nested routing: the two guards are layout routes whose children are the protected
  pages.
- URL parameters: `/cars/:carId` (car details) and
  `/reservations/:reservationId/edit` (edit page for one reservation).

## 5. List → Details Flow

**Catalog / list page**

- Each car card shows a photo, model, class, gearbox, fuel, seats and the daily price
  (with the old and new price when the car is on promotion).
- The user can filter by class and gearbox. From the home page, they can also search
  by dates and choose their desired pickup location; cars already reserved in that period are hidden.

**Details page**

- Navigation is triggered with `useNavigate` when a card is clicked. The chosen
  location and dates are passed in the router state so the booking form is prefilled.
- The page reads `carId` with `useParams`, loads the car and its reservations
  (to compute availability and the price), and shows the car's reviews. An unknown
  id shows a "car not found" message.

## 6. Data Source & Backend

**Backend type:** Supabase, a hosted backend-as-a-service: PostgreSQL database with a
REST API, Supabase Auth, and Row Level Security. There is no custom server; the React
app talks to Supabase over HTTPS through `utils/request.js`.

Access rules enforced by the database:

- `Reservations`: only the owner can update or delete a row (`auth.uid() = "userId"`),
  and a user can only insert a reservation under their own id.
- `Reviews`: readable by everyone; a user can only insert or delete rows that
  carry their own id.

## 7. Data Operations (CRUD)

The main collection is **Reservations**.

- **Create:** on the car page the logged-in user selects location and dates and
  confirms. The app sends a POST request with the car, dates, total price and user id,
  shows a toast and opens "My reservations".
- **Read:** "My reservations" fetches the current user's reservations and the cars
  and shows them as cards. The car page reads all reservations of a car to compute
  availability.
- **Update:** the author clicks "Промени" and opens
  `/reservations/:reservationId/edit`. The page loads the reservation, lets the user
  change the dates, recalculates the price, checks that no other booking overlaps, and
  sends a PATCH request. After saving, the user returns to the list, which is loaded
  again and shows the new values.
- **Delete:** the author clicks "Анулирай" and confirms. A DELETE request is sent, and
  the card is removed from the list without reloading the page.

The **Reviews** collection is also created, read and deleted (by its author) from the
car page; the list updates immediately after each action.

## 8. Forms & Validation

**Forms used:** search form (home), login, register, car booking, edit reservation,
review, contact, transfer request.

**Validation rules**

- **Register – email:** required, must have a valid email format.
- **Register – password:** required, minimum 6 characters, and the confirmation field
  must match it.
- **Search – location and dates:** location and both dates are required, dates cannot
  be in the past, and the return date cannot be before the pick-up date.
- **Booking and edit – dates:** the return date must not be before the pick-up date, the
  period must not overlap another booking of the same car (checked on the page and,
  when editing, again on the server before saving).
- **Review – comment:** required, 5 to 500 characters (also enforced by the database);
  rating is 1 to 5 stars; one review per user per car.

Login, register, booking and review forms use controlled inputs. Validation messages
appear inline next to the form; results of actions (saved, deleted, failed) appear as
toast notifications.

## 9. React-Specific Techniques

**Hooks and component lifecycle**

- `useState`, `useContext`, `useEffect`, `useParams`, `useNavigate`, `useLocation`.
- Custom hooks: `useFetch(path, initialData, token)` returns `{ data, isLoading, error }`;
  `usePersistedState(key, initial)` is `useState` backed by `localStorage`.
- Lifecycle example: `useFetch` sends its request when the component **mounts**; if the
  path changes (for example a different car) the effect cleans up and **updates** with a
  new request; when the user leaves the page, the cleanup sets a flag so the late
  response is ignored (**unmount**) and no state is updated on a removed component.
- Derived values (total days, total price, availability, average rating) are calculated
  during render instead of being stored in state.

**Context API**

`AuthContext` shares the access token, the user, `isAuthenticated`, and the
`login`, `register` and `logout` functions. It is consumed by the header, route guards,
car details, reviews, my reservations, edit reservation and the catalog.

**Component styling**

CSS Modules per component (scoped class names), a global stylesheet with CSS
variables (colors, spacing), and Font Awesome icons.

## 10. Typical User Flow

1. A visitor opens the home page, picks a pick-up location and dates, and searches.
2. The catalog shows only the cars that are free in that period. The visitor filters by
   class or gearbox and opens a car.
3. On the car page the visitor sees the price, the availability and the reviews, and
   clicks "Влезте, за да резервирате" (or registers first).
4. After logging in, the user opens the car again, confirms the reservation and lands on
   "My reservations".
5. Later the user edits the dates on the edit page or cancels the reservation, and
   leaves a review on the car page.

## 11. Error & Edge Case Handling

- **Authentication errors:** wrong credentials, an already registered email or mismatched
  passwords are shown inline in the form. An expired session ends with a redirect to
  login. Direct visits to private pages redirect guests to login.
- **Network or data errors:** every page that loads data shows a loading state and, on
  failure, a readable error message (for example when there is no connection).
  Failed actions (booking, saving, deleting) show an error toast, and buttons are
  disabled while a request is running.
- **Empty or missing data:** messages for no matching cars, no offers, no reservations
  and no reviews; a "not found" message for an unknown car or reservation id; a 404
  page for unknown routes.

## Known limitations and future improvements

- Guests cannot book without an account; a phone number field and a guest checkout are
  planned improvements.
- After logging in from a car page the user returns to the home page; returning to the
  same car with the chosen dates is planned.
- Two users confirming the same dates at exactly the same time can both pass the
  overlap check; a database exclusion constraint would remove this.
- Reservations are readable by everyone because the availability check needs them;
  a restricted view exposing only car and dates would be more private.
- Plan to add english language page and a toggle button to choose between english and bulgarian versions.