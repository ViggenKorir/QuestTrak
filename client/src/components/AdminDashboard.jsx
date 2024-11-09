import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import { FaUser, FaUserTie, FaUserFriends, FaUsers, FaClipboardList, FaRegListAlt, FaUserPlus } from 'react-icons/fa';

function AdminDashboard() {
  const [members, setMembers] = useState([]);
  const [totalMembers, setTotalMembers] = useState(0);
  const [maleCount, setMaleCount] = useState(0);
  const [femaleCount, setFemaleCount] = useState(0);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const displayMembers = async () => {
      try {
        const response = await fetch("https://vault-reg.onrender.com/homemembers");
        if (!response.ok) {
          throw new Error('Failed to fetch members');
        }
        const data = await response.json();
        console.log('Fetched Members:', data);

        if (data && data.length > 0) {
          setMembers(data);
          setTotalMembers(data.length);

          // Count male and female members
          const males = data.filter(member => member.gender_enum === 'Male').length;
          const females = data.filter(member => member.gender_enum === 'Female').length;
          setMaleCount(males);
          setFemaleCount(females);

          // Debugging logs
          console.log('Male Count:', males);
          console.log('Female Count:', females);
        } else {
          setError('No members found.');
        }
      } catch (error) {
        setError(error.message);
      }
    };
    displayMembers();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    navigate('/');
    console.log("User logged out");
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to right, #1D4ED8, #D946EF)',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <header style={{
        backgroundColor: '#1E3A8A',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        padding: '1.5rem',
        color: 'white',
        position: 'relative',
      }}>
        <h1 style={{
          fontSize: '1.875rem',
          fontWeight: 'bold',
          letterSpacing: '0.025em',
        }}>Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            backgroundColor: '#FF4757',
            color: 'white',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '0.5rem',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: 'bold',
            transition: 'background-color 0.3s',
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FF6B81'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FF4757'}
        >
          Logout
        </button>
      </header>

      <main style={{ flexGrow: 1, padding: '2.5rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '2rem',
            marginBottom: '2.5rem',
          }}>
            {[
              { title: 'Total Members', value: totalMembers > 0 ? totalMembers : 'Loading...', icon: <FaUsers /> },
              { title: 'Total Groups', value: '8', icon: <FaUserFriends /> },
              { title: 'Telios', value: maleCount > 0 ? maleCount : 'Loading...', icon: <FaUserTie /> },
              { title: 'Elysians', value: femaleCount > 0 ? femaleCount : 'Loading...', icon: <FaUser /> },
            ].map((stat, idx) => (
              <div key={idx} style={{
                backgroundColor: 'white',
                padding: '1.5rem',
                boxShadow: '0px 10px 15px rgba(0, 0, 0, 0.1)',
                borderRadius: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
              }}>
                <div style={{ fontSize: '2.5rem', color: '#4B5563' }}>{stat.icon}</div>
                <div>
                  <h2 style={{ fontSize: '1rem', fontWeight: '600', color: '#4B5563' }}>{stat.title}</h2>
                  <p style={{
                    fontSize: '2.5rem',
                    fontWeight: 'bold',
                    color: '#111827',
                  }}>{stat.value}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '1.5rem',
          }}>
            {[
              { to: '/register-member', label: 'Register New Member', color: '#16A34A', icon: <FaUserPlus /> },
              { to: '/view-members', label: 'View All Members', color: '#2563EB', icon: <FaRegListAlt /> },
              { to: '/attendance-report', label: 'Attendance Report', color: '#7C3AED', icon: <FaClipboardList /> },
              { to: '/attendance-details', label: 'Attendance Details', color: '#7C3AED', icon: <FaClipboardList /> },
            ].map((link, idx) => (
              <Link
                key={idx}
                to={link.to}
                style={{
                  backgroundColor: link.color,
                  color: 'white',
                  padding: '1rem 2rem',
                  borderRadius: '0.5rem',
                  textAlign: 'center',
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  textDecoration: 'none',
                }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
                onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
              >
                {link.icon} {link.label}
              </Link>
            ))}
          </div>
        </div>
      </main>

      <footer style={{
        backgroundColor: '#111827',
        color: 'white',
        padding: '1.5rem',
        textAlign: 'center',
      }}>
        <Footer />
      </footer>
    </div>
  );
}

export default AdminDashboard;
