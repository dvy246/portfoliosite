import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, Award, TrendingUp, Users } from 'lucide-react';

const Testimonials: React.FC = () => {
  const achievements = [
    {
      icon: Award,
      title: 'Academic Excellence',
      description: 'BCom (Hons) with distinction, demonstrating strong analytical and business fundamentals',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: TrendingUp,
      title: 'Rapid Skill Development',
      description: 'Mastered advanced AI/ML concepts through intensive self-learning and practical projects',
      color: 'from-gold-500 to-gold-600'
    },
    {
      icon: Users,
      title: 'Collaborative Projects',
      description: 'Successfully completed team projects combining business strategy with technical implementation',
      color: 'from-green-500 to-green-600'
    }
  ];

  const testimonials = [
    {
      name: 'Dr. Sarah Mitchell',
      position: 'Professor of Data Science',
      company: 'University of Technology',
      content: 'Divy\'s unique combination of business understanding and technical aptitude sets him apart. His projects demonstrate not just coding ability, but strategic thinking about real-world applications.',
      image: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=200',
      rating: 5
    },
    {
      name: 'Rajesh Kumar',
      position: 'Senior ML Engineer',
      company: 'Tech Innovations Hub',
      content: 'Working with Divy on collaborative projects has been impressive. He brings a fresh perspective that bridges business needs with technical solutions. His learning curve is remarkable.',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=200',
      rating: 5
    }
  ];

  return (
    <section id="testimonials" className="py-20 bg-gradient-to-br from-navy-50 to-platinum-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-navy-900 mb-6">
            Academic <span className="text-gold-600">Recognition</span>
          </h2>
          <p className="text-xl text-navy-600 max-w-3xl mx-auto">
            Recognition from mentors, peers, and academic leaders who've witnessed my journey from commerce to AI
          </p>
        </motion.div>

        {/* Key Achievements */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 text-center"
            >
              <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${achievement.color} flex items-center justify-center mx-auto mb-4`}>
                <achievement.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-navy-900 mb-3">{achievement.title}</h3>
              <p className="text-navy-600 leading-relaxed">{achievement.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid lg:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 relative"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 text-gold-200">
                <Quote className="w-8 h-8" />
              </div>

              {/* Rating */}
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-gold-500 fill-current" />
                ))}
              </div>

              {/* Content */}
              <blockquote className="text-navy-700 mb-6 leading-relaxed italic">
                "{testimonial.content}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold text-navy-900">{testimonial.name}</h4>
                  <p className="text-navy-600 text-sm">{testimonial.position}</p>
                  <p className="text-gold-600 text-sm font-medium">{testimonial.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Future Goals */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-navy-900 to-navy-800 rounded-2xl shadow-lg p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Ready to Make an Impact</h3>
            <p className="text-navy-200 max-w-3xl mx-auto leading-relaxed mb-6">
              As a fresh graduate with a unique blend of business acumen and AI expertise, I'm eager to contribute 
              to innovative projects that solve real-world problems. My journey is just beginning, and I'm excited 
              to bring fresh perspectives and boundless enthusiasm to the right opportunity.
            </p>
            <div className="grid md:grid-cols-3 gap-8 mt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-gold-400 mb-2">Fresh</div>
                <p className="text-navy-300">Perspective & Energy</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gold-400 mb-2">Unique</div>
                <p className="text-navy-300">Business + AI Combination</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gold-400 mb-2">Ready</div>
                <p className="text-navy-300">To Learn & Contribute</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;