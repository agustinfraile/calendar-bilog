"use client";

import CalendarSection from "@/components/CalendarSection/CalendarSection";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useCalendarStore } from "@/store/store"
import { useEffect } from "react";


const HomeCalendar = () => {

    const { getAllAppointments } = useCalendarStore();

    useEffect(() => {
        getAllAppointments();
    }, [getAllAppointments]);

    const state = useCalendarStore();

    const appointments = state.appointments;

    return (
        <section className="flex flex-col items-center justify-center w-full h-full bg-gray-100 p-4">
          <Card className="text-center w-full md:w-1/2">
            <CardHeader>
              <CardTitle className="text-4xl font-bold text-gray-800">Mis citas</CardTitle>
              <CardDescription className="text-lg text-gray-600">Gestiona y organiza todas tus citas de manera eficiente</CardDescription>
            </CardHeader>
          </Card>
          <div className="mt-8 w-full md:w-3/4">
            <CalendarSection appointments={appointments} />
          </div>
        </section>
      );
}

export default HomeCalendar