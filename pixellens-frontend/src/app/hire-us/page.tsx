'use client';

import { useState } from 'react';
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Card from "@/components/Card";
import Input from "@/components/Input";
import Button from "@/components/Button";
import apiClient from "@/lib/apiClient";

interface LeadFormData {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  budget: string;
  eventDate: string;
  description: string;
}

export default function HireUsPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<LeadFormData>({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    budget: '',
    eventDate: '',
    description: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const services = [
    {
      title: 'Wedding Photography',
      description: 'Capture your special day with cinematic elegance',
      features: ['Full day coverage', 'Edited photos', 'Photo album', 'Online gallery'],
      price: 'Starting from ₹40,000',
      icon: '💍'
    },
    {
      title: 'Corporate Events',
      description: 'Professional coverage for conferences and corporate functions',
      features: ['Event documentation', 'Team photos', 'Highlights video', 'Same-day edits'],
      price: 'Starting from ₹25,000',
      icon: '🏢'
    },
    {
      title: 'Brand Films',
      description: 'Compelling visual stories that elevate your brand',
      features: ['Concept development', 'Professional crew', 'Post-production', 'Multiple revisions'],
      price: 'Starting from ₹80,000',
      icon: '🎬'
    },
    {
      title: 'Product Shoots',
      description: 'Showcase your products with stunning visuals',
      features: ['Studio setup', 'Multiple angles', 'Editing & retouching', 'Commercial license'],
      price: 'Starting from ₹15,000',
      icon: '📦'
    },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiClient.post('/service-leads/', {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        projectType: formData.projectType,
        budgetRange: formData.budget,
        eventDate: formData.eventDate,
        details: formData.description,
        status: 'NEW'
      });
      setIsSubmitted(true);
    } catch (error) {
      console.error('Failed to submit form:', error);
      alert('Failed to submit request. Please try again.');
    }
  };

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-linear-to-b from-gray-900 to-black">
        <div className="container-custom">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-center">Hire Us</h1>
          <p className="text-xl text-gray-400 text-center max-w-2xl mx-auto">
            Professional photography and filmmaking services for your special moments
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-gray-950">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card 
                key={index} 
                className="bg-gray-900 border border-gray-800 hover:border-[#D4AF37] hover:scale-105 transition-all duration-300"
              >
                <div className="p-6 text-center h-full flex flex-col">
                  <div className="text-5xl mb-4">{service.icon}</div>
                  <h3 className="text-xl font-bold mb-3 text-white">{service.title}</h3>
                  <p className="text-gray-300 text-sm mb-6 grow">{service.description}</p>
                  <ul className="text-left space-y-2 mb-6 text-sm">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-[#D4AF37] mr-2 mt-1">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <p className="text-[#D4AF37] font-bold mt-auto">{service.price}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Form */}
      <section className="py-20 bg-black">
        <div className="container-custom max-w-3xl">
          {!isSubmitted ? (
            <>
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Request a Quote</h2>
                <p className="text-gray-400">Fill out the form below and we'll get back to you within 24 hours</p>
              </div>

              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex justify-between mb-2 text-xs sm:text-sm">
                  <span className={`font-medium ${currentStep >= 1 ? 'text-[#D4AF37]' : 'text-gray-500'}`}>Project Type</span>
                  <span className={`font-medium ${currentStep >= 2 ? 'text-[#D4AF37]' : 'text-gray-500'}`}>Budget & Date</span>
                  <span className={`font-medium ${currentStep >= 3 ? 'text-[#D4AF37]' : 'text-gray-500'}`}>Contact</span>
                  <span className={`font-medium ${currentStep >= 4 ? 'text-[#D4AF37]' : 'text-gray-500'}`}>Details</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div 
                    className="bg-[#D4AF37] h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>

              <Card>
                <form onSubmit={handleSubmit} className="p-8">
                {/* Step 1: Project Type */}
                {currentStep === 1 && (
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold mb-6 text-center">What type of project do you need?</h3>
                    <select
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleInputChange}
                      required
                      className="input"
                    >
                      <option value="">Select a service</option>
                      <option value="wedding">Wedding Photography</option>
                      <option value="corporate">Corporate Event</option>
                      <option value="brand-film">Brand Film</option>
                      <option value="product">Product Photography</option>
                      <option value="other">Other</option>
                    </select>
                    <Button
                      type="button"
                      variant="primary"
                      onClick={() => formData.projectType && setCurrentStep(2)}
                      className="w-full mt-6"
                    >
                      Next
                    </Button>
                  </div>
                )}

                {/* Step 2: Budget & Date */}
                {currentStep === 2 && (
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold mb-6 text-center">Budget and Timeline</h3>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      required
                      className="input"
                    >
                      <option value="">Select your budget</option>
                      <option value="under-25k">Under ₹25,000</option>
                      <option value="25k-50k">₹25,000 - ₹50,000</option>
                      <option value="50k-100k">₹50,000 - ₹1,00,000</option>
                      <option value="100k-plus">Above ₹1,00,000</option>
                    </select>
                    <Input
                      type="date"
                      name="eventDate"
                      label="Event/Project Date"
                      value={formData.eventDate}
                      onChange={handleInputChange}
                      required
                    />
                    <div className="flex gap-4 mt-6">
                      <Button
                        type="button"
                        variant="secondary"
                        onClick={() => setCurrentStep(1)}
                        className="flex-1"
                      >
                        Back
                      </Button>
                      <Button
                        type="button"
                        variant="primary"
                        onClick={() => formData.budget && formData.eventDate && setCurrentStep(3)}
                        className="flex-1"
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                )}

                {/* Step 3: Contact Info */}
                {currentStep === 3 && (
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold mb-6 text-center">Your Contact Information</h3>
                    <Input
                      type="text"
                      name="name"
                      label="Full Name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                    <Input
                      type="email"
                      name="email"
                      label="Email Address"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                    <Input
                      type="tel"
                      name="phone"
                      label="Phone Number"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                    <div className="flex gap-4 mt-6">
                      <Button
                        type="button"
                        variant="secondary"
                        onClick={() => setCurrentStep(2)}
                        className="flex-1"
                      >
                        Back
                      </Button>
                      <Button
                        type="button"
                        variant="primary"
                        onClick={() => formData.name && formData.email && formData.phone && setCurrentStep(4)}
                        className="flex-1"
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                )}

                {/* Step 4: Details */}
                {currentStep === 4 && (
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold mb-6 text-center">Additional Details</h3>
                    <div>
                      <label htmlFor="description" className="block text-sm font-medium mb-2">Tell us more about your project</label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        rows={6}
                        className="input"
                        placeholder="Share your vision, expectations, and any specific requirements..."
                        required
                      />
                    </div>
                    <div className="flex gap-4 mt-6">
                      <Button
                        type="button"
                        variant="secondary"
                        onClick={() => setCurrentStep(3)}
                        className="flex-1"
                      >
                        Back
                      </Button>
                      <Button
                        type="submit"
                        variant="accent"
                        className="flex-1"
                      >
                        Submit Request
                      </Button>
                    </div>
                  </div>
                )}
                </form>
              </Card>
            </>
          ) : (
            <Card>
            <div className="p-12 text-center">
              <div className="text-7xl mb-6 text-[#D4AF37]">✓</div>
              <h3 className="text-3xl md:text-4xl font-bold mb-4">Thank You!</h3>
              <p className="text-gray-400 mb-6">
                We've received your request and will get back to you within 24 hours.
              </p>
              <Button
                variant="primary"
                onClick={() => {
                  setIsSubmitted(false);
                  setCurrentStep(1);
                  setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    projectType: '',
                    budget: '',
                    eventDate: '',
                    description: ''
                  });
                }}
              >
                Submit Another Request
              </Button>
            </div>
            </Card>
          )}
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-20 bg-gray-950">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Our Process</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Consultation', desc: 'We discuss your vision and requirements' },
              { step: '02', title: 'Planning', desc: 'Create a detailed project plan and timeline' },
              { step: '03', title: 'Execution', desc: 'Professional shoot with our expert team' },
              { step: '04', title: 'Delivery', desc: 'Edited content delivered on time' },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl font-bold text-[#D4AF37] mb-4">{item.step}</div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
