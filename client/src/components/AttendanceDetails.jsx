import { useState, useEffect } from 'react';

const styles = {
  container: {
    fontFamily: 'Roboto, sans-serif',
  },
  button: {
    padding: '0.5rem',
    color: 'white',
    borderRadius: '0.25rem',
    marginRight: '0.5rem',
  },
  printButton: {
    backgroundColor: '#48bb78',
  },
  backButton: {
    backgroundColor: '#1e3a8a',
    color: 'white',
    padding: '0.5rem 1rem',
    borderRadius: '0.25rem',
    cursor: 'pointer',
    marginBottom: '1rem',
  },
  loadingText: {
    fontSize: '1rem',
    color: '#666',
  },
  errorText: {
    color: '#f56565',
  },
  attendanceCard: {
    padding: '1rem',
    borderRadius: '0.5rem',
    backgroundColor: '#3182ce',
    color: '#ffffff',
    textAlign: 'center',
    cursor: 'pointer',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    maxWidth: '200px',
    margin: '1rem',
    flex: '0 1 calc(33.33% - 2rem)', // Adjust width and spacing
  },
  cardContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around', // Align cards with space around
    margin: '0 -1rem', // Negative margin to counteract card margin
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '1rem',
  },
  th: {
    padding: '0.5rem 1rem',
    textAlign: 'left',
    borderBottom: '2px solid #e2e8f0',
  },
  td: {
    padding: '0.5rem 1rem',
    borderBottom: '1px solid #e2e8f0',
  },
  present: {
    color: '#48bb78',
  },
  absent: {
    color: '#f56565',
  },
};

function AttendanceDetails({ selectedDate, onBack }) {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMemberAttendanceForDate = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://vault-reg.onrender.com/attendancedetails?date=${selectedDate}`);
        if (!response.ok) {
          throw new Error('Failed to fetch attendance details for the selected date');
        }
        const data = await response.json();
        setMembers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMemberAttendanceForDate();
  }, [selectedDate]);

  const printReport = () => {
    window.print();
  };

  return (
    <div style={styles.container}>
      <button onClick={onBack} style={styles.backButton}>
        Back to Summary
      </button>
      <button onClick={printReport} style={{ ...styles.button, ...styles.printButton }}>
        Print Report
      </button>
      {loading ? (
        <p style={styles.loadingText}>Loading attendance details...</p>
      ) : error ? (
        <p style={styles.errorText}>{error}</p>
      ) : members.length === 0 ? (
        <p>No attendance records available for {selectedDate}.</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Member Name</th>
              <th style={styles.th}>Attendance Status</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member) => (
              <tr key={member.id}>
                <td style={styles.td}>{`${member.first_name} ${member.last_name}`}</td>
                <td style={{ ...styles.td, ...(member.present ? styles.present : styles.absent) }}>
                  {member.present ? 'Present' : 'Absent'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

function AttendanceSummary() {
  const [attendanceDays, setAttendanceDays] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAttendanceDays = async () => {
      try {
        const response = await fetch('https://vault-reg.onrender.com/attendancedetails');
        if (!response.ok) {
          throw new Error('Failed to fetch attendance summaries');
        }
        const data = await response.json();
        
        // Ensure to filter unique Sundays before setting attendanceDays
        const uniqueDates = Array.from(new Set(data.map(day => day.date))); // Adjust based on actual data format
        setAttendanceDays(uniqueDates.map(date => ({ date })));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAttendanceDays();
  }, []);

  const handleCardClick = (date) => {
    // Only allow click if the date is valid and not "N/A"
    const selectedDay = attendanceDays.find(day => day.date === date);
    if (selectedDay && selectedDay.date !== 'N/A') {
      setSelectedDate(date);
    }
  };

  const handleBack = () => {
    setSelectedDate(null);
  };

  return (
    <div style={styles.container}>
      {selectedDate ? (
        <AttendanceDetails selectedDate={selectedDate} onBack={handleBack} />
      ) : (
        <>
          <h2>Select a Sunday to View Attendance Details</h2>
          {loading ? (
            <p style={styles.loadingText}>Loading attendance summaries...</p>
          ) : error ? (
            <p style={styles.errorText}>{error}</p>
          ) : (
            <div style={styles.cardContainer}>
              {attendanceDays.map((day) => (
                <div
                  key={day.date}
                  style={styles.attendanceCard}
                  onClick={() => handleCardClick(day.date)} // Only allow click on valid dates
                >
                  <h3>{day.date}</h3>
                  <p>Click to view details</p>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}


export default AttendanceSummary;
