import React from 'react'
import { StudentsOpinion } from './src/components/course/StudentsOpinion'

// Test data from the user's JSON
const testimonialsData = {
  type: "testimonials",
  name: "Students opinion",
  description: "",
  bg_color: "",
  order_idx: 12,
  values: [
    {
      description: "IELTS Score: 8.5",
      id: "metaChPiCPV4q51727178095164",
      name: "Junaed Bin Samad",
      profile_image: "https://cdn.10minuteschool.com/images/catalog/product/testimonial/Screenshot_39_1746355488882.png",
      testimonial: "IELTS Score: 8.5",
      thumb: "https://cdn.10minuteschool.com/images/catalog/product/testimonial/AvB2ibYd1z4-HD_1727177955435.jpg",
      video_type: "",
      video_url: "AvB2ibYd1z4"
    },
    {
      description: "IELTS Score: 8",
      id: "metahap6qbGVFX1727178095164",
      name: "Shah Mohammad Rafi",
      profile_image: "https://cdn.10minuteschool.com/images/catalog/product/testimonial/Screenshot_45_1746359412430.png",
      testimonial: "IELTS Score: 8",
      thumb: "https://cdn.10minuteschool.com/images/catalog/product/testimonial/KcwncFcSIOY-HD_1727178045711.jpg",
      video_type: "",
      video_url: "KcwncFcSIOY"
    },
    {
      description: "IELTS Score: 8",
      id: "metaSOA0KvU74O1719742425625",
      name: "Tisha Farhana",
      profile_image: "https://cdn.10minuteschool.com/images/catalog/product/testimonial/Screenshot_37_1746355194606.png",
      testimonial: "প্রথম ভিডিওটা দেখেই বুঝেছিলাম যে কোর্সটা বেশ গোছানো এবং অন্যান্য কোর্সগুলোর মতন Advanced English-এ না পড়িয়ে মুনজেরিন আপু বাংলায় সবকিছু সুন্দর করে বুঝিয়েছেন। রিডিং পার্ট-এ প্র্যাক্টিসে-এর সময় ৪-৫-এর বেশি স্কোর তুলতে পারতাম না এবং এই কোর্সের রিডিং পার্টটা করে আমি আমার IELTS-এ স্কোর ৮ পেয়েছি। নিজের মত করে প্রিপারেশন নিতে কোর্সটি অনেক হেল্প করেছে।",
      thumb: "https://cdn.10minuteschool.com/images/catalog/product/testimonial/Screenshot_38_1746355189549.png",
      video_type: "",
      video_url: "b_8gi18HSXQ"
    },
    {
      description: "IELTS Score: 8",
      id: "meta1BwDjItXAr1746357877595",
      name: "Asim Nabil",
      profile_image: "https://cdn.10minuteschool.com/images/catalog/product/testimonial/Screenshot_15_1746957495847.png",
      testimonial: "আমি অনেক রিসোর্স দেখেছিলাম, কিন্তু এই কোর্সটাই ছিল সবচেয়ে organized!\n8.0 স্কোর করতে পেরেছি কারণ এখানে প্রতিটি টপিক ছিল logically arranged আর super easy to understand!\nMock test আর support group দুটোই আমার preparation-এ game-changer ছিল।\nবিশ্বাস করতে পারিনি এতটা smooth-ভাবে প্রস্তুতি নিতে পারবো।",
      thumb: "",
      video_type: "",
      video_url: ""
    }
  ]
}

export default function TestStudentsOpinion() {
  return (
    <div className="min-h-screen bg-gray-100">
      <StudentsOpinion section={testimonialsData} />
    </div>
  )
} 