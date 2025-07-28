import React from 'react';
import { CourseExclusiveFeature } from './src/components/course/CourseExclusiveFeature';

// Test data based on your JSON
const testSection = {
  type: "feature_explanations" as const,
  name: "Course Exclusive Feature",
  description: "",
  bg_color: "",
  order_idx: 8,
  values: [
    {
      checklist: [
        "IELTS Academic ও General Training নিয়ে আলোচনা",
        "Reading, Writing, Listening ও Speaking এর Overview & Format",
        "প্রতিটি প্রশ্নের ধরন-ভিত্তিক উত্তর করার স্ট্র্যাটেজি",
        "ভিডিওর সাথে প্র্যাকটিসের সুযোগ"
      ],
      file_type: "image" as const,
      file_url: "https://cdn.10minuteschool.com/images/k-12-courses/ielts_mock_sqr.png",
      id: "metaHsuQkeQFRI1719742426817",
      title: "ভিডিও লেকচার",
      video_thumbnail: ""
    },
    {
      checklist: [
        "10 Reading & 10 Listening Mock Tests",
        "Computer-delivered IELTS পরীক্ষার এক্সপেরিয়েন্স",
        "উত্তর সাবমিট করার সাথে সাথেই রেজাল্ট",
        "যেকোনো সময়, যেকোনো জায়গা থেকে মক টেস্ট"
      ],
      file_type: "image" as const,
      file_url: "https://cdn.10minuteschool.com/images/k-12-courses/ielts_mock_book_sqr.png",
      id: "metaVTQUNx3LL61719742426817",
      title: "Reading ও Listening Mock Tests",
      video_thumbnail: ""
    }
  ]
};

// Test component
function TestCourseExclusiveFeature() {
  return (
    <div>
      <CourseExclusiveFeature section={testSection} />
    </div>
  );
}

export default TestCourseExclusiveFeature; 