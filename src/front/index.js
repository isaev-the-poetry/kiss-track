const CreateBuffer = () => {
  var buffer = [];
  return {
    insert: (data) => (buffer = [...buffer, ...data]),
    pick: () => {
      const data = [...buffer];
      buffer = [];
      return data;
    },
    getLength: () => buffer.length,
  };
};
const EventsBuffer = CreateBuffer();

var LastAttemptTime = 0;
const UpdateLastAttemptTime = () => (LastAttemptTime = Date.now());
const GetLastAttemptTime = () => LastAttemptTime;
var SceduledTimeout;

// 'text/plain' to avoid preflight CORS
const SendEvents = async (events) => {
  try {
    const response = await fetch("http://localhost:8001/track", {
      method: "POST",
      headers: {
        "Content-Type": "text/plain",
      },
      body: JSON.stringify(events),
    });
    return response.status == 200;
  } catch (e) {
    return false;
  }
};

const TrackEvent = (event, ...tags) => {
  EventsBuffer.insert([
    {
      event,
      tags,
      uri: document.location.href,
      title: document.title,
      ts: new Date().toISOString(),
    },
  ]);

  const Attempt = async () => {
    const secondIsGone = GetLastAttemptTime() <= Date.now() - 1000;
    const got3Events = EventsBuffer.getLength() >= 3;
    if (secondIsGone || got3Events) {
      UpdateLastAttemptTime();

      const currentEvents = EventsBuffer.pick();
      const sendSuccessfull = await SendEvents(currentEvents);
      if (sendSuccessfull) {
        if (SceduledTimeout) {
          SceduledTimeout = clearTimeout(SceduledTimeout);
        }
      } else EventsBuffer.insert(currentEvents);
    } else {
      if (!SceduledTimeout) SceduledTimeout = setTimeout(Attempt, 1000);
    }
  };
  setTimeout(Attempt, 0);
};

const onUnload = () => {
  if (EventsBuffer.getLength() > 0)
    navigator.sendBeacon(
      "http://localhost:8001/track",
      JSON.stringify(EventsBuffer.pick())
    );
};

window.tracker = {};
window.tracker.track = TrackEvent;
window.addEventListener("unload", onUnload);
