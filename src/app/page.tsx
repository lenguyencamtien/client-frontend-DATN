// Home.tsx
'use client'
import { useEffect } from 'react';
import { RootState } from '@/redux/store';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setServices, setLoading as setServiceLoading } from '@/redux/store/serviceSlice';
import { setDoctors, setLoading as setDoctorLoading } from '@/redux/store/doctorSlice';
import Banner from "@/components/ui/banner";
import ChatBox from "@/components/ui/chatbox";
import CareSection from "@/components/ui/caresection";
import Service from "@/components/ui/service";
import Specialty from "@/components/ui/specialty";
import News from "@/components/ui/new";
import Footer from "@/components/ui/footer";
import Doctors from '@/components/ui/doctor';

export default function Home() {
  const dispatch = useDispatch();
  const { doctors, loading: doctorsLoading } = useSelector((state: RootState) => state.doctors);

  useEffect(() => {
    const fetchServices = async () => {
      dispatch(setServiceLoading(true));
      try {
        const response = await axios.get('http://localhost:8080/api/v1/specialties');
        const serviceList = response.data.result;
        dispatch(setServices(serviceList));
      } catch (err) {
        console.error('Lỗi khi lấy dịch vụ:', err);
      } finally {
        dispatch(setServiceLoading(false));
      }
    };

    const fetchDoctors = async () => {
      dispatch(setDoctorLoading(true));
      try {
        const response = await axios.get('http://localhost:8080/api/v1/doctors');
        const doctorList = response.data.result;
        dispatch(setDoctors(doctorList));
      } catch (err) {
        console.error('Lỗi khi lấy bác sĩ:', err);
      } finally {
        dispatch(setDoctorLoading(false));
      }
    };

    fetchServices();
    fetchDoctors();
  }, [dispatch]);

  // Hàm xử lý khi chọn bác sĩ
  const handleSelectDoctor = (id: string) => {
    console.log("Đã chọn bác sĩ với ID:", id);
    // Xử lý thêm nếu cần, ví dụ: lưu ID vào Redux, hiển thị chi tiết bác sĩ, v.v.
  };

  return (
    <main className="container mx-auto">
      <Banner />
      <ChatBox />
      <CareSection />
      <Specialty />
      <Service />
      <Doctors doctors={doctors} loading={doctorsLoading} onSelectDoctor={handleSelectDoctor} />
      <News />
      <Footer />
    </main>
  );
}
