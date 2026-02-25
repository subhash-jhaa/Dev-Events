import { auth, currentUser } from "@clerk/nextjs/server";
import { getBookingsByUserId } from "@/lib/actions/booking.actions";
import Eventcard from "@/components/Eventcard";
import { RedirectToSignIn } from "@clerk/nextjs";
import { Calendar, MapPin, User, Ticket } from "lucide-react";
import Link from "next/link";

const ProfilePage = async () => {
    const { userId } = await auth();
    const user = await currentUser();

    if (!userId || !user) {
        return <RedirectToSignIn />;
    }

    const bookings = await getBookingsByUserId(userId);

    return (
        <section id="profile" className="py-10">
            <div className="flex flex-col md:flex-row gap-10 items-start">
                {/* User Info Sidebar */}
                <div className="w-full md:w-1/3 bg-dark-100 border border-dark-200 rounded-2xl p-8 card-shadow">
                    <div className="flex flex-col items-center text-center gap-4">
                        <div className="w-24 h-24 rounded-full border-4 border-primary/20 overflow-hidden shadow-xl shadow-primary/10">
                            <img
                                src={user.imageUrl}
                                alt={user.fullName || "User"}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold">{user.fullName}</h2>
                            <p className="text-light-200 text-sm">{user.primaryEmailAddress?.emailAddress}</p>
                        </div>
                    </div>

                    <div className="mt-10 space-y-4">
                        <div className="flex items-center gap-3 text-light-100 bg-dark-200/50 p-4 rounded-xl">
                            <Ticket className="text-primary" size={20} />
                            <div>
                                <p className="text-[10px] uppercase font-bold text-light-200/50 tracking-wider">Total Bookings</p>
                                <p className="font-semibold text-lg">{bookings.length}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 text-light-100 bg-dark-200/50 p-4 rounded-xl">
                            <User className="text-primary" size={20} />
                            <div>
                                <p className="text-[10px] uppercase font-bold text-light-200/50 tracking-wider">Username</p>
                                <p className="font-semibold">{user.username || "n/a"}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bookings List */}
                <div className="flex-1 w-full">
                    <div className="flex flex-col gap-2 mb-8">
                        <h1>My Bookings</h1>
                        <p className="text-light-200">You have {bookings.length} upcoming and past event bookings.</p>
                    </div>

                    {bookings.length > 0 ? (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {bookings.map((booking: any) => (
                                <div key={booking._id} className="relative group">
                                    <Eventcard {...booking.eventId} />
                                    <div className="mt-2 flex items-center justify-between px-2">
                                        <p className="text-[10px] text-light-200/50 uppercase font-medium">Booked on {new Date(booking.createdAt).toLocaleDateString()}</p>
                                        <Link
                                            href={`/events/${booking.eventId.slug}`}
                                            className="text-primary text-xs font-semibold hover:underline flex items-center gap-1"
                                            prefetch={false}
                                        >
                                            View Details
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex-center flex-col gap-6 py-24 border border-dashed border-dark-200 rounded-2xl bg-dark-100/30">
                            <div className="bg-dark-200 p-6 rounded-full">
                                <Calendar size={48} className="text-light-200 opacity-20" />
                            </div>
                            <div className="text-center">
                                <h3 className="mb-2">No Bookings Yet</h3>
                                <p className="text-light-200 max-w-xs mx-auto">Discover amazing developer events and secure your spot today!</p>
                            </div>
                            <Link href="/" className="bg-primary hover:bg-primary/90 text-black px-8 py-3 rounded-full font-bold transition-all shadow-lg shadow-primary/20" prefetch={false}>
                                Explore Events
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default ProfilePage;
