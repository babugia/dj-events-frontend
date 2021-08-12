import Layout from '@/components/layout';
import EventItem from '@/components/event-item';
import { API_URL } from '@/config/index';

const PER_PAGE = 2;

export default function EventsPage({ events }) {
  return (
    <Layout>
      <h1>Events</h1>
      {events.length === 0 && <h3>No events to show</h3>}

      {events.map((event) => (
        <EventItem key={event.id} event={event} />
      ))}
    </Layout>
  );
}

export async function getServerSideProps({ query: { page = 1 } }) {
  // calculate start page
  const normalizedPage = Number(page);
  const start = normalizedPage === 1 ? 0 : (normalizedPage - 1) * PER_PAGE;

  const res = await fetch(
    `${API_URL}/events?_sort=date:ASC&_limit=${PER_PAGE}&_start=${start}`
  );
  const events = await res.json();

  return {
    props: {
      events,
    },
  };
}
