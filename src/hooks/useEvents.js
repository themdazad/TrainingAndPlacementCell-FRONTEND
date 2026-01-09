/**
 * useEvents Hook
 * PPTs, workshops, seminars management
 */
import { useState, useCallback } from 'react';
import { eventsAPI as eventsApi } from '../api';
import { toast } from '../utils/toast';

export const useEvents = () => {
  const [events, setEvents] = useState([]);
  const [event, setEvent] = useState(null);
  const [registrations, setRegistrations] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchEvents = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const data = await eventsApi.getEvents(params);
      setEvents(data.events || data.data || []);
      if (data.pagination) {
        setPagination(data.pagination);
      }
      return data;
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to fetch events';
      setError(message);
      toast.error(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchEvent = useCallback(async (eventId) => {
    setLoading(true);
    setError(null);
    try {
      const data = await eventsApi.getEvent(eventId);
      setEvent(data.event || data.data);
      return data;
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to fetch event';
      setError(message);
      toast.error(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchUpcomingEvents = useCallback(async (limit = 10) => {
    setLoading(true);
    setError(null);
    try {
      const data = await eventsApi.getUpcomingEvents(limit);
      return data.events || data.data || [];
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to fetch upcoming events';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchMyEvents = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const data = await eventsApi.getMyEvents(params);
      setEvents(data.events || data.data || []);
      if (data.pagination) {
        setPagination(data.pagination);
      }
      return data;
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to fetch your events';
      setError(message);
      toast.error(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const createEvent = useCallback(async (eventData) => {
    setLoading(true);
    setError(null);
    try {
      const data = await eventsApi.createEvent(eventData);
      toast.success('Event created successfully');
      return data;
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to create event';
      setError(message);
      toast.error(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateEvent = useCallback(async (eventId, eventData) => {
    setLoading(true);
    setError(null);
    try {
      const data = await eventsApi.updateEvent(eventId, eventData);
      toast.success('Event updated successfully');
      return data;
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to update event';
      setError(message);
      toast.error(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const publishEvent = useCallback(async (eventId) => {
    setLoading(true);
    try {
      const data = await eventsApi.publishEvent(eventId);
      toast.success('Event published');
      return data;
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to publish event');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const cancelEvent = useCallback(async (eventId) => {
    setLoading(true);
    try {
      const data = await eventsApi.cancelEvent(eventId);
      toast.success('Event cancelled');
      return data;
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to cancel event');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteEvent = useCallback(async (eventId) => {
    setLoading(true);
    try {
      await eventsApi.deleteEvent(eventId);
      setEvents((prev) => prev.filter((e) => e._id !== eventId));
      toast.success('Event deleted');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete event');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const registerForEvent = useCallback(async (eventId) => {
    setLoading(true);
    try {
      const data = await eventsApi.registerForEvent(eventId);
      toast.success('Registered for event');
      return data;
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to register');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const cancelRegistration = useCallback(async (eventId) => {
    setLoading(true);
    try {
      await eventsApi.cancelRegistration(eventId);
      toast.success('Registration cancelled');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to cancel registration');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchRegistrations = useCallback(async (eventId, params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const data = await eventsApi.getRegistrations(eventId, params);
      setRegistrations(data.registrations || data.data || []);
      if (data.pagination) {
        setPagination(data.pagination);
      }
      return data;
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to fetch registrations';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const markAttendance = useCallback(async (eventId, studentId, attended = true) => {
    try {
      const data = await eventsApi.markAttendance(eventId, studentId, attended);
      toast.success(attended ? 'Attendance marked' : 'Attendance unmarked');
      return data;
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to mark attendance');
      throw err;
    }
  }, []);

  const submitFeedback = useCallback(async (eventId, feedbackData) => {
    setLoading(true);
    try {
      const data = await eventsApi.submitFeedback(eventId, feedbackData);
      toast.success('Feedback submitted');
      return data;
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to submit feedback');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    events,
    event,
    registrations,
    pagination,
    loading,
    error,
    fetchEvents,
    fetchEvent,
    fetchUpcomingEvents,
    fetchMyEvents,
    createEvent,
    updateEvent,
    publishEvent,
    cancelEvent,
    deleteEvent,
    registerForEvent,
    cancelRegistration,
    fetchRegistrations,
    markAttendance,
    submitFeedback,
    setEvent,
  };
};

export default useEvents;
