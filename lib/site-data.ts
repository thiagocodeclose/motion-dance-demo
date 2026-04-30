export const siteData = {
  gym: {
    name: 'Motion Dance Studio',
    tagline: 'Move. Express. Transform.',
    location: 'Los Angeles, CA',
    phone: '(323) 555-0192',
    email: 'hello@motiondancestudio.com',
    address: '5450 Wilshire Blvd, Los Angeles, CA 90036',
    instagram: 'https://instagram.com/motiondancela',
    hero_video: 'https://videos.pexels.com/video-files/4763824/4763824-uhd_2560_1440_24fps.mp4',
    hero_poster: 'https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?w=1600&q=80',
  },
  disciplines: [
    { name: 'Contemporary', level: 'All Levels', sessions: '12/week', desc: 'Fluid movement that bridges technique and raw expression. From beginner to advanced — find your voice through contemporary dance.' },
    { name: 'Hip-Hop', level: 'Beginner+', sessions: '10/week', desc: 'High-energy street styles rooted in culture and community. Learn the foundational vocabulary that powers modern music videos and stages.' },
    { name: 'Ballet', level: 'All Levels', sessions: '8/week', desc: 'The foundation of all dance forms. Our ballet program builds strength, posture, and precision from the very first plié.' },
    { name: 'Heels', level: 'Beginner+', sessions: '6/week', desc: 'Confident, fierce, and unapologetically powerful. Heels classes blend commercial choreography with strength and sensuality.' },
    { name: 'Afrobeats', level: 'All Levels', sessions: '8/week', desc: 'West African rhythms meet contemporary choreography. High energy, deeply rooted in joy and community connection.' },
    { name: 'Salsa & Latin', level: 'All Levels', sessions: '6/week', desc: 'Partner work, footwork patterns, and hip motion. Latin dance training from social floor to competitive stage.' },
  ],
  performances: [
    { title: 'Spring Showcase', date: 'March 15, 2025', venue: 'The Wiltern, LA', type: 'Student Showcase' },
    { title: 'Guest Artist Intensive', date: 'April 5–6, 2025', venue: 'Motion Main Stage', type: 'Workshop' },
    { title: 'Choreography Lab', date: 'April 20, 2025', venue: 'Motion Black Box', type: 'In-Studio Show' },
    { title: 'Summer Intensive Gala', date: 'July 18, 2025', venue: 'The Ford Theatre', type: 'Annual Gala' },
  ],
  instructors: [
    { name: 'Amara Diallo', role: 'Artistic Director', styles: 'Contemporary · Afrobeats', bio: 'Alvin Ailey alumna and former principal dancer with ODC San Francisco. Amara\'s classes blend technical rigor with deeply personal expression.' },
    { name: 'Jordan Lee', role: 'Hip-Hop Director', styles: 'Hip-Hop · Street Jazz', bio: 'Former BDC NY faculty and touring dancer for multiple Grammy Award-winning artists. Jordan\'s classes fill within minutes of opening.' },
    { name: 'Isabella Reyes', role: 'Ballet & Latin Faculty', styles: 'Ballet · Salsa · Heels', bio: 'Trained at the Royal Ballet School and Puerto Rican folklore ensembles. Isabella brings world-class ballet training to every level.' },
  ],
  pricing: [
    { name: 'Drop-In', price: '$28', period: 'per class', features: ['Any single class', 'All disciplines', 'Rental shoes available', 'Open studio access'], highlight: false },
    { name: 'Studio Pass', price: '$125', period: '5 classes', features: ['5 class credits', 'All disciplines', 'Valid 90 days', 'Performance discounts', 'Rental shoes included'], highlight: true },
    { name: 'Unlimited', price: '$185', period: 'per month', features: ['Unlimited classes', 'All disciplines', 'Performance priority', 'Intensive discounts', 'Open studio access'], highlight: false },
  ],
};
