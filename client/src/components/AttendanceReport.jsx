import { useState, useEffect } from 'react';
import reportBg from '../images/reportbg.jpg';
import { Pie, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const styles = {
  container: {
    backgroundImage: `url(${reportBg})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    minHeight: '100vh',
    padding: '3rem',
    color: 'white',
    fontFamily: 'Roboto, sans-serif',
  },
  header: {
    fontSize: '2rem',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '1.5rem',
    textShadow: '2px 2px 6px rgba(0, 0, 0, 0.6)',
  },
  totalMembers: {
    fontSize: '1.25rem',
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: '1.5rem',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    padding: '1rem',
    borderRadius: '0.5rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
  },
  cardContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1rem',
    padding: '2rem 0',
    width: '100%',
  },
  attendanceCard: {
    padding: '1rem',
    borderRadius: '0.5rem',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    color: '#ffffff',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    textAlign: 'center',
    cursor: 'pointer',
  },
  cardTitle: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    marginBottom: '0.5rem',
  },
  cardDetails: {
    fontSize: '1rem',
    lineHeight: '1.5',
  },
  chartsContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '2rem',
    padding: '2rem 0',
  },
  chartWrapper: {
    width: '24rem',
    height: '24rem',
    padding: '1rem',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: '0.5rem',
  },
  backButton: {
    marginTop: '1rem',
    padding: '0.75rem 1.5rem',
    backgroundColor: '#1e3a8a',
    color: 'white',
    border: 'none',
    borderRadius: '0.375rem',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '500',
    transition: 'background-color 0.3s ease',
  },
};

function AttendanceCard({ date, percentage, onClick }) {
  return (
    <div style={styles.attendanceCard} onClick={() => onClick(date)}>
      <h3 style={styles.cardTitle}>{date}</h3>
      <p style={styles.cardDetails}>Attendance: {percentage}%</p>
    </div>
  );
}

function AttendanceReport() {
  const [totalMembers, setTotalMembers] = useState(0);
  const [attendancePercentage, setAttendancePercentage] = useState(0);
  const [absentMembers, setAbsentMembers] = useState(0);
  const [attendanceTrends, setAttendanceTrends] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        const response = await fetch('https://vault-reg.onrender.com/reports');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setTotalMembers(data.totalMembers);
        setAttendancePercentage(data.attendancePercentage);
        setAbsentMembers(data.absentMembers);
        setAttendanceTrends(data.attendanceTrends);
      } catch (err) {
        console.error("Error fetching attendance data:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendanceData();
  }, []);

  const handleCardClick = (date) => {
    setSelectedDate(date);
  };

  const handleBackToCards = () => {
    setSelectedDate(null);
  };

  const selectedData = attendanceTrends.find((trend) => trend.date === selectedDate);

  const pieData = selectedData
    ? {
        labels: ['Present', 'Absent'],
        datasets: [
          {
            data: [selectedData.percentage, 100 - selectedData.percentage],
            backgroundColor: ['#4caf50', '#f44336'],
          },
        ],
      }
    : null;

  const lineData = {
    labels: attendanceTrends.map((item) => item.date),
    datasets: [
      {
        label: 'Attendance Trend',
        data: attendanceTrends.map((item) => item.percentage),
        fill: false,
        borderColor: '#42a5f5',
      },
    ],
  };

  return (
    <div style={styles.container}>
        <button style={styles.backButton} onClick={handleBackToCards}>
          Back
        </button>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div>
          <h2 style={styles.header}>Attendance Report</h2>
          <div style={styles.totalMembers}>
            <h3>Total Members: {totalMembers}</h3>
          </div>

          {selectedDate ? (
            <>
              <div style={styles.chartsContainer}>
                <div style={styles.chartWrapper}>
                  <Pie data={pieData} />
                </div>
                <div style={styles.chartWrapper}>
                  <Line data={lineData} />
                </div>
              </div>
            </>
          ) : (
            <div style={styles.cardContainer}>
              {attendanceTrends.map((trend, index) => (
                <AttendanceCard
                  key={index}
                  date={trend.date}
                  percentage={trend.percentage}
                  onClick={handleCardClick}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default AttendanceReport;
