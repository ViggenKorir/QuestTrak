import random
from app import app
from models import db, Group, Attendance, Member, Event, MemberEvent, Admin
from faker import Faker
from datetime import datetime, timedelta

fake = Faker()

def church_events():
    events = [
        "Family Gathering",
        "Community Worship",
        "Prayer Service",
        "Bible Study",
        "Youth Retreat",
        "Charity Bake Sale",
        "Praise Concert",
        "Volunteer Day",
        "Harvest Festival",
        "Mission Trip Fundraiser",
    ]
    return random.choice(events)

def clear_database():
    print('Clearing database...')
    MemberEvent.query.delete()
    Attendance.query.delete()
    Member.query.delete()
    Event.query.delete()
    Group.query.delete()
    Admin.query.delete()

def seed_groups(group_names):
    print("Seeding groups...")
    groups = [Group(name=name) for name in group_names]
    db.session.add_all(groups)
    db.session.commit()

def seed_members(num_members, groups):
    print("Seeding members...")
    members = [
        Member(
            first_name=fake.first_name(),
            last_name=fake.last_name(),
            dob=fake.date(),
            location=fake.city(),
            phone=fake.phone_number(),
            is_student=fake.boolean(chance_of_getting_true=50),
            will_be_coming=fake.boolean(chance_of_getting_true=50),
            is_visitor=fake.boolean(chance_of_getting_true=50),
            school=fake.company(),
            occupation=fake.job(),
            group_id=random.choice(groups).id
        ) for _ in range(num_members)
    ]
    db.session.add_all(members)
    db.session.commit()
    return members

def seed_attendance(members):
    print("Seeding attendances...")
    today = datetime.now()
    days_to_sunday = 6 - today.weekday() if today.weekday() < 6 else 0
    attendance_date = (today + timedelta(days=days_to_sunday)).strftime('%Y-%m-%d')

    attendances = [
        Attendance(
            date=attendance_date,
            status=random.choice(['present', 'absent']),
            member_id=random.choice(members).id
        ) for _ in range(20)
    ]
    db.session.add_all(attendances)
    db.session.commit()

def seed_events(num_events):
    print("Seeding events...")
    events = [Event(name=church_events()) for _ in range(num_events)]
    db.session.add_all(events)
    db.session.commit()
    return events

def seed_member_events(members, events):
    print("Seeding member events...")
    memberevents = [
        MemberEvent(
            member_id=random.choice(members).id,
            event_id=random.choice(events).id
        ) for _ in range(50)
    ]
    db.session.add_all(memberevents)
    db.session.commit()

def seed_admin():
    print("Seeding users...")
    user = Admin(
        username=fake.user_name(),
        password='tripin'  # Consider hashing passwords for security
    )
    db.session.add(user)
    db.session.commit()

if __name__ == '__main__':
    with app.app_context():
        clear_database()

        group_names = [
            "Transformers",
            "Relentless",
            "Innovators",
            "Pacesetters",
            "Ignition",
            "Gifted",
            "Visionaries",
            "Elevated"
        ]

        seed_groups(group_names)
        groups = Group.query.all()  # Fetch groups after seeding

        members = seed_members(30, groups)
        seed_attendance(members)

        events = seed_events(30)
        seed_member_events(members, events)
        seed_admin()
