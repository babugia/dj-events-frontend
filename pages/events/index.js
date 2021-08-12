import Layout from '@/components/layout';
import EventItem from '@/components/event-item';
import Pagination from '@/components/pagination';
import { API_URL, PER_PAGE } from '@/config/index';

export default function EventsPage({ events, total, page }) {
  return (
    <Layout>
      <h1>Events</h1>
      {events.length === 0 && <h3>No events to show</h3>}

      {events.map((event) => (
        <EventItem key={event.id} event={event} />
      ))}

      <Pagination page={page} total={total} />
    </Layout>
  );
}

export async function getServerSideProps({ query: { page = 1 } }) {
  // calculate start page
  const normalizedPage = Number(page);
  const start = normalizedPage === 1 ? 0 : (normalizedPage - 1) * PER_PAGE;

  // Fetch total count
  const totalRes = await fetch(`${API_URL}/events/count`);
  const total = await totalRes.json();

  // Fetch events
  const eventsRes = await fetch(
    `${API_URL}/events?_sort=date:ASC&_limit=${PER_PAGE}&_start=${start}`
  );
  const events = await eventsRes.json();

  return {
    props: {
      events,
      total,
      page: normalizedPage,
    },
  };
}
