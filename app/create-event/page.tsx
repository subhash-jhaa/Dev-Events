'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import posthog from 'posthog-js'
import { ChevronLeft, ChevronRight, Plus, X, Upload, Loader2 } from 'lucide-react'

const CreateEventPage = () => {
    const { isSignedIn, isLoaded, user } = useUser();
    const router = useRouter();

    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        overview: '',
        venue: '',
        location: '',
        date: '',
        time: '',
        mode: 'offline',
        audience: '',
        organizer: '',
        tags: [] as string[],
        agenda: [] as string[],
    });

    const [currentTag, setCurrentTag] = useState('');
    const [currentAgendaItem, setCurrentAgendaItem] = useState('');
    const [imageFile, setImageFile] = useState<File | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const addTag = () => {
        if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
            setFormData(prev => ({ ...prev, tags: [...prev.tags, currentTag.trim()] }));
            setCurrentTag('');
        }
    };

    const removeTag = (tagToRemove: string) => {
        setFormData(prev => ({ ...prev, tags: prev.tags.filter(tag => tag !== tagToRemove) }));
    };

    const addAgendaItem = () => {
        if (currentAgendaItem.trim()) {
            setFormData(prev => ({ ...prev, agenda: [...prev.agenda, currentAgendaItem.trim()] }));
            setCurrentAgendaItem('');
        }
    };

    const removeAgendaItem = (index: number) => {
        setFormData(prev => ({ ...prev, agenda: prev.agenda.filter((_, i) => i !== index) }));
    };

    const validateStep = (currentStep: number) => {
        if (currentStep === 1) {
            if (!formData.title || !formData.description || !formData.overview) {
                setError('Please fill in all basic info fields');
                return false;
            }
        } else if (currentStep === 2) {
            if (!formData.date || !formData.time || !formData.location || !formData.venue || !formData.organizer || !formData.audience) {
                setError('Please fill in all logistics fields');
                return false;
            }
        }
        setError('');
        return true;
    };

    const nextStep = () => {
        if (validateStep(step)) {
            setStep(prev => prev + 1);
        }
    };

    const prevStep = () => {
        setError('');
        setStep(prev => prev - 1);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (formData.tags.length === 0) {
            setError('Please add at least one tag');
            return;
        }
        if (formData.agenda.length === 0) {
            setError('Please add at least one agenda item');
            return;
        }
        if (!imageFile) {
            setError('Please upload an event image');
            return;
        }

        setLoading(true);

        try {
            const data = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                if (key === 'tags' || key === 'agenda') {
                    data.append(key, (value as string[]).join(','));
                } else {
                    data.append(key, value as string);
                }
            });
            if (imageFile) {
                data.append('image', imageFile);
            }

            const response = await fetch('/api/events', {
                method: 'POST',
                body: data,
            });

            const result = await response.json();

            if (response.ok) {
                posthog.capture('event_created', {
                    slug: result.event.slug,
                    title: result.event.title
                });
                router.push(`/events/${result.event.slug}`);
            } else {
                setError(result.message || 'Failed to create event');
            }
        } catch (err) {
            console.error('Submit error:', err);
            setError('An unexpected error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (!isLoaded) return <div className="flex-center min-h-[60vh]"><Loader2 className="animate-spin text-primary" /></div>;

    if (!isSignedIn) {
        router.push('/');
        return null;
    }

    return (
        <div id="create-event" className="max-w-3xl mx-auto w-full py-10">
            <h1 className="text-center mb-10">Create a New Event</h1>

            <div className="flex justify-between mb-12 relative">
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-dark-200 -translate-y-1/2 z-0"></div>
                {[1, 2, 3].map((s) => (
                    <div
                        key={s}
                        className={`z-10 w-10 h-10 rounded-full flex-center font-bold transition-colors ${step >= s ? 'bg-primary text-black' : 'bg-dark-100 border border-dark-200 text-light-200'
                            }`}
                    >
                        {s}
                    </div>
                ))}
            </div>

            <form onSubmit={handleSubmit} className="bg-dark-100 border border-dark-200 card-shadow rounded-[10px] p-8">
                {error && (
                    <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-4 rounded-md mb-6 text-sm">
                        {error}
                    </div>
                )}

                {step === 1 && (
                    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-right-4 duration-300">
                        <h3>Step 1: Basic Info</h3>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-light-100">Event Title</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                placeholder="e.g. React Conference 2026"
                                className="bg-dark-200 rounded-[6px] px-5 py-3 outline-none focus:ring-1 ring-primary/50 transition-all"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-light-100">Short Overview</label>
                            <input
                                type="text"
                                name="overview"
                                value={formData.overview}
                                onChange={handleInputChange}
                                placeholder="A brief one-sentence summary"
                                className="bg-dark-200 rounded-[6px] px-5 py-3 outline-none focus:ring-1 ring-primary/50 transition-all"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-light-100">Detailed Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                rows={5}
                                placeholder="Describe what the event is about, why people should attend..."
                                className="bg-dark-200 rounded-[6px] px-5 py-3 outline-none focus:ring-1 ring-primary/50 transition-all resize-none"
                            ></textarea>
                        </div>
                        <div className="flex justify-end mt-4">
                            <button
                                type="button"
                                onClick={nextStep}
                                className="bg-primary hover:bg-primary/90 text-black px-6 py-2.5 rounded-[6px] font-semibold flex items-center gap-2 transition-all"
                            >
                                Logistics <ChevronRight size={18} />
                            </button>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-right-4 duration-300">
                        <h3>Step 2: Logistics</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-light-100">Date</label>
                                <input
                                    type="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleInputChange}
                                    className="bg-dark-200 rounded-[6px] px-5 py-3 outline-none focus:ring-1 ring-primary/50 transition-all invert-calendar-icon"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-light-100">Time</label>
                                <input
                                    type="text"
                                    name="time"
                                    value={formData.time}
                                    onChange={handleInputChange}
                                    placeholder="e.g. 10:00 AM"
                                    className="bg-dark-200 rounded-[6px] px-5 py-3 outline-none focus:ring-1 ring-primary/50 transition-all"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-light-100">Venue</label>
                                <input
                                    type="text"
                                    name="venue"
                                    value={formData.venue}
                                    onChange={handleInputChange}
                                    placeholder="e.g. Tech Hub Auditorium"
                                    className="bg-dark-200 rounded-[6px] px-5 py-3 outline-none focus:ring-1 ring-primary/50 transition-all"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-light-100">Location</label>
                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleInputChange}
                                    placeholder="e.g. San Francisco, CA"
                                    className="bg-dark-200 rounded-[6px] px-5 py-3 outline-none focus:ring-1 ring-primary/50 transition-all"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-light-100">Event Mode</label>
                                <select
                                    name="mode"
                                    value={formData.mode}
                                    onChange={handleInputChange}
                                    className="bg-dark-200 rounded-[6px] px-5 py-3 outline-none focus:ring-1 ring-primary/50 transition-all appearance-none"
                                >
                                    <option value="offline">Offline</option>
                                    <option value="online">Online</option>
                                    <option value="hybrid">Hybrid</option>
                                </select>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-light-100">Target Audience</label>
                                <input
                                    type="text"
                                    name="audience"
                                    value={formData.audience}
                                    onChange={handleInputChange}
                                    placeholder="e.g. Frontend Developers"
                                    className="bg-dark-200 rounded-[6px] px-5 py-3 outline-none focus:ring-1 ring-primary/50 transition-all"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-light-100">Organizer</label>
                            <input
                                type="text"
                                name="organizer"
                                value={formData.organizer}
                                onChange={handleInputChange}
                                placeholder="e.g. React India Community"
                                className="bg-dark-200 rounded-[6px] px-5 py-3 outline-none focus:ring-1 ring-primary/50 transition-all"
                            />
                        </div>
                        <div className="flex justify-between mt-4">
                            <button
                                type="button"
                                onClick={prevStep}
                                className="bg-dark-200 hover:bg-dark-200/80 text-light-100 px-6 py-2.5 rounded-[6px] font-semibold flex items-center gap-2 transition-all"
                            >
                                <ChevronLeft size={18} /> Basic Info
                            </button>
                            <button
                                type="button"
                                onClick={nextStep}
                                className="bg-primary hover:bg-primary/90 text-black px-6 py-2.5 rounded-[6px] font-semibold flex items-center gap-2 transition-all"
                            >
                                Media & Tags <ChevronRight size={18} />
                            </button>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-right-4 duration-300">
                        <h3>Step 3: Media & Tags</h3>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-light-100">Event Image</label>
                            <div
                                className="border-2 border-dashed border-dark-200 rounded-lg p-6 flex-center flex-col gap-4 bg-dark-200/30 hover:bg-dark-200/50 transition-all cursor-pointer relative overflow-hidden h-[240px]"
                                onClick={() => document.getElementById('image-upload')?.click()}
                            >
                                {imagePreview ? (
                                    <img src={imagePreview} alt="Preview" className="absolute inset-0 w-full h-full object-cover" />
                                ) : (
                                    <>
                                        <div className="bg-primary/10 p-4 rounded-full">
                                            <Upload className="text-primary" size={32} />
                                        </div>
                                        <p className="text-sm text-light-200 text-center">Click to upload or drag and drop<br /><span className="text-xs opacity-50">PNG, JPG or WEBP (max. 10MB)</span></p>
                                    </>
                                )}
                            </div>
                            <input
                                type="file"
                                id="image-upload"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-light-100">Tags</label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={currentTag}
                                    onChange={(e) => setCurrentTag(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                                    placeholder="Add a tag..."
                                    className="bg-dark-200 rounded-[6px] px-5 py-3 outline-none focus:ring-1 ring-primary/50 transition-all flex-1"
                                />
                                <button
                                    type="button"
                                    onClick={addTag}
                                    className="bg-dark-200 hover:bg-dark-200/80 text-light-100 px-4 rounded-[6px] transition-all"
                                >
                                    <Plus size={20} />
                                </button>
                            </div>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {formData.tags.map((tag) => (
                                    <span key={tag} className="pill flex items-center gap-2 bg-primary/10 text-primary border border-primary/20">
                                        {tag}
                                        <X size={14} className="cursor-pointer hover:text-white" onClick={() => removeTag(tag)} />
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-light-100">Agenda</label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={currentAgendaItem}
                                    onChange={(e) => setCurrentAgendaItem(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addAgendaItem())}
                                    placeholder="Add an agenda item..."
                                    className="bg-dark-200 rounded-[6px] px-5 py-3 outline-none focus:ring-1 ring-primary/50 transition-all flex-1"
                                />
                                <button
                                    type="button"
                                    onClick={addAgendaItem}
                                    className="bg-dark-200 hover:bg-dark-200/80 text-light-100 px-4 rounded-[6px] transition-all"
                                >
                                    <Plus size={20} />
                                </button>
                            </div>
                            <ul className="flex flex-col gap-2 mt-2 list-none">
                                {formData.agenda.map((item, index) => (
                                    <li key={index} className="bg-dark-200/50 p-3 rounded-md flex justify-between items-center text-sm">
                                        {item}
                                        <X size={16} className="cursor-pointer text-light-200 hover:text-white" onClick={() => removeAgendaItem(index)} />
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="flex justify-between mt-4">
                            <button
                                type="button"
                                onClick={prevStep}
                                className="bg-dark-200 hover:bg-dark-200/80 text-light-100 px-6 py-2.5 rounded-[6px] font-semibold flex items-center gap-2 transition-all"
                            >
                                <ChevronLeft size={18} /> Logistics
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="bg-primary hover:bg-primary/95 text-black px-8 py-2.5 rounded-[6px] font-bold flex items-center gap-2 transition-all shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <> <Loader2 className="animate-spin" size={20} /> Creating... </>
                                ) : (
                                    'Publish Event'
                                )}
                            </button>
                        </div>
                    </div>
                )}
            </form>

            <style jsx>{`
                .invert-calendar-icon::-webkit-calendar-picker-indicator {
                    filter: invert(1);
                }
            `}</style>
        </div>
    )
}

export default CreateEventPage
