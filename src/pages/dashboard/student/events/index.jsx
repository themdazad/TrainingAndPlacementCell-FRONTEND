/**
 * Student Events Page
 * Browse and register for placement events
 */
import { useEffect, useState, useCallback } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Chip,
  Button,
  Skeleton,
  Pagination,
  Tabs,
  Tab,
} from '@heroui/react';
import { useEvents } from '../../../../hooks';
import { formatDateTime } from '../../../../utils/helpers';

const EventCard = ({ event, onRegister, onCancel, registering }) => {
  const isUpcoming = new Date(event.schedule?.date) > new Date();
  const isFull = event.registeredCount >= event.capacity;
  const isRegistered = event.isRegistered;

  const getEventTypeColor = (type) => {
    const colors = {
      PPT: 'primary',
      Workshop: 'secondary',
      Seminar: 'warning',
      Training: 'success',
      'Mock Interview': 'danger',
      'Career Fair': 'primary',
    };
    return colors[type] || 'default';
  };

  return (
    <Card className="h-full">
      <CardHeader className="flex justify-between items-start gap-2">
        <div className="flex-1">
          <Chip color={getEventTypeColor(event.type)} variant="flat" size="sm" className="mb-2">
            {event.type}
          </Chip>
          <h3 className="font-semibold text-lg">{event.title}</h3>
          {event.company && <p className="text-default-500">By {event.company}</p>}
        </div>
      </CardHeader>
      <CardBody className="space-y-3">
        <p className="text-sm text-default-600 line-clamp-2">{event.description}</p>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <svg
              className="w-4 h-4 text-default-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span>{formatDateTime(event.schedule?.date)}</span>
          </div>
          <div className="flex items-center gap-2">
            <svg
              className="w-4 h-4 text-default-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span>{event.venue || 'Online'}</span>
          </div>
          <div className="flex items-center gap-2">
            <svg
              className="w-4 h-4 text-default-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span>
              {event.registeredCount || 0}/{event.capacity || '∞'} registered
            </span>
          </div>
        </div>
      </CardBody>
      <CardFooter className="border-t border-divider">
        {isRegistered ? (
          <div className="flex justify-between items-center w-full">
            <Chip color="success" variant="flat">
              Registered
            </Chip>
            {isUpcoming && (
              <Button
                size="sm"
                color="danger"
                variant="flat"
                isLoading={registering}
                onPress={() => onCancel(event._id)}
              >
                Cancel
              </Button>
            )}
          </div>
        ) : isUpcoming ? (
          <Button
            color="primary"
            size="sm"
            isDisabled={isFull}
            isLoading={registering}
            onPress={() => onRegister(event._id)}
            className="w-full"
          >
            {isFull ? 'Event Full' : 'Register Now'}
          </Button>
        ) : (
          <Chip color="default" variant="flat">
            Event Ended
          </Chip>
        )}
      </CardFooter>
    </Card>
  );
};

const StudentEvents = () => {
  const {
    events,
    pagination,
    loading,
    fetchEvents,
    fetchMyEvents,
    registerForEvent,
    cancelRegistration,
  } = useEvents();
  const [selectedTab, setSelectedTab] = useState('upcoming');
  const [page, setPage] = useState(1);
  const [registering, setRegistering] = useState(false);

  const loadEvents = useCallback(() => {
    if (selectedTab === 'my-events') {
      fetchMyEvents({ page, limit: 9 });
    } else {
      fetchEvents({
        page,
        limit: 9,
        status: selectedTab === 'upcoming' ? 'Published' : undefined,
      });
    }
  }, [fetchMyEvents, fetchEvents, page, selectedTab]);

  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  const handleRegister = async (eventId) => {
    setRegistering(true);
    try {
      await registerForEvent(eventId);
      // Refresh events
      if (selectedTab === 'my-events') {
        fetchMyEvents({ page, limit: 9 });
      } else {
        fetchEvents({ page, limit: 9, status: 'Published' });
      }
    } catch {
      // Error handled by hook
    } finally {
      setRegistering(false);
    }
  };

  const handleCancel = async (eventId) => {
    if (window.confirm('Are you sure you want to cancel your registration?')) {
      setRegistering(true);
      try {
        await cancelRegistration(eventId);
        if (selectedTab === 'my-events') {
          fetchMyEvents({ page, limit: 9 });
        } else {
          fetchEvents({ page, limit: 9, status: 'Published' });
        }
      } catch {
        // Error handled by hook
      } finally {
        setRegistering(false);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Placement Events</h1>
        <p className="text-default-500">Register for PPTs, workshops, and more</p>
      </div>

      {/* Tabs */}
      <Tabs
        selectedKey={selectedTab}
        onSelectionChange={setSelectedTab}
        color="primary"
        variant="underlined"
      >
        <Tab key="upcoming" title="Upcoming Events" />
        <Tab key="my-events" title="My Registrations" />
        <Tab key="all" title="All Events" />
      </Tabs>

      {/* Events Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array(6)
            .fill(0)
            .map((_, i) => (
              <Skeleton key={i} className="h-72 rounded-xl" />
            ))}
        </div>
      ) : events.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <EventCard
                key={event._id}
                event={event}
                onRegister={handleRegister}
                onCancel={handleCancel}
                registering={registering}
              />
            ))}
          </div>

          {/* Pagination */}
          {pagination.pages > 1 && (
            <div className="flex justify-center">
              <Pagination total={pagination.pages} page={page} onChange={setPage} />
            </div>
          )}
        </>
      ) : (
        <Card>
          <CardBody className="text-center py-12">
            <svg
              className="w-16 h-16 mx-auto text-default-300 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <h3 className="text-lg font-medium mb-2">No Events</h3>
            <p className="text-default-500">
              {selectedTab === 'my-events'
                ? "You haven't registered for any events yet"
                : 'No events available at the moment'}
            </p>
          </CardBody>
        </Card>
      )}
    </div>
  );
};

export default StudentEvents;
