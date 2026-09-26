window.CK = window.CK || {};
CK.CENTRES = ["Thane", "Vashi", "Borivali", "Dadar", "Online"];
CK.EXAMS = ["CET", "CAT", "SNAP", "NMAT", "XAT", "CMAT"];
CK.SOURCES = ["Cetking.com", "XATKing", "Google Ads", "Meta Ads", "Walk-in", "WhatsApp", "Referral", "Demo form"];
CK.STAGES = ["New", "Contacted", "Demo booked", "Demo attended", "Fee discussed", "Joined", "Lost", "Dormant"];
CK.TEMPS = ["Unassessed", "Hot", "Warm", "Cold"];
CK.OUTCOMES = ["Connected", "No answer", "Busy", "Wrong number", "WhatsApp only", "Callback set", "Interested", "Fees high", "Not serious"];
CK.LOST = ["Fees", "Joined competitor", "Not serious", "Location", "Timing", "No response", "Duplicate", "Other"];
CK.OWNERS = [
  { id: "c1", name: "Ananya Shah", role: "counsellor", centre: "Thane" },
  { id: "c2", name: "Rohit Patil", role: "counsellor", centre: "Vashi" },
  { id: "c3", name: "Meera Iyer", role: "counsellor", centre: "Borivali" },
  { id: "c4", name: "Kabir Khan", role: "telecaller", centre: "Dadar" },
  { id: "m1", name: "Sneha Joshi", role: "mentor", centre: "Thane" },
  { id: "ops", name: "Sumedh", role: "ops", centre: "All" }
];
function nid(p) { return p + Math.random().toString(36).slice(2, 8); }
function daysAgo(n) { const d = new Date(); d.setDate(d.getDate() - n); return d.toISOString(); }
function daysAhead(n) { const d = new Date(); d.setDate(d.getDate() + n); return d.toISOString(); }
CK.seed = function () {
  const people = [];
  const rows = [
    ["Priya Deshmukh", "9876500001", "CET", "2027", "Thane", "Cetking.com", "New", "Unassessed", "c1", 0, 0],
    ["Aarav Mehta", "9876500002", "CAT", "2026", "Vashi", "Google Ads", "Contacted", "Hot", "c2", 1, 0],
    ["Isha Kulkarni", "9876500003", "CET", "2027", "Borivali", "WhatsApp", "Demo booked", "Hot", "c3", 2, 0],
    ["Rohan Joshi", "9876500004", "SNAP", "2026", "Dadar", "XATKing", "Fee discussed", "Hot", "c4", 3, 0],
    ["Sana Qureshi", "9876500005", "CET", "2027", "Online", "Meta Ads", "Contacted", "Warm", "c1", 4, 1],
    ["Vikram Rao", "9876500006", "CAT", "2026", "Thane", "Referral", "Demo attended", "Warm", "c1", 6, 2],
    ["Neha Bansal", "9876500007", "NMAT", "2026", "Vashi", "Walk-in", "New", "Unassessed", null, 0, 0],
    ["Harsh Patel", "9876500008", "CET", "2027", "Borivali", "Demo form", "Contacted", "Cold", "c3", 12, 3],
    ["Tanvi Shah", "9876500009", "XAT", "2026", "Online", "XATKing", "Dormant", "Cold", "c2", 20, 10],
    ["Aditya Nair", "9876500010", "CAT", "2026", "Thane", "Google Ads", "Lost", "Cold", "c1", 18, 5],
    ["Kavya Menon", "9876500011", "CET", "2027", "Dadar", "Cetking.com", "New", "Unassessed", "c4", 0, 0],
    ["Yash Agarwal", "9876500012", "CMAT", "2027", "Vashi", "WhatsApp", "Contacted", "Warm", "c2", 2, 0],
    ["Pooja Rane", "9876500013", "CET", "2026", "Thane", "Walk-in", "Fee discussed", "Hot", "c1", 1, 0],
    ["Dev Sharma", "9876500014", "CAT", "2026", "Online", "Meta Ads", "Demo attended", "Hot", "c2", 3, 0],
    ["Ritika Jain", "9876500015", "CET", "2027", "Borivali", "Referral", "New", "Unassessed", null, 1, 0]
  ];
  rows.forEach((r, i) => {
    const [name, mobile, exam, year, centre, source, stage, temp, owner, age, fuOff] = r;
    const id = "p" + (i + 1);
    const created = daysAgo(age);
    const terminal = stage === "Lost" || stage === "Dormant" || stage === "Joined";
    const nextFu = terminal ? null : (fuOff === 0 ? daysAgo(0) : fuOff > 0 && age > 5 ? daysAgo(fuOff) : daysAhead(1));
    const person = {
      id, name, mobile, email: name.split(" ")[0].toLowerCase() + "@mail.com",
      city: centre === "Online" ? "Mumbai" : centre,
      enquiries: [{
        id: "e" + (i + 1), personId: id, source, site: source,
        exam, attemptYear: year, graduation: "Final year", course: exam + " classroom",
        centre, mode: centre === "Online" ? "Online" : "Classroom",
        stage, temperature: temp, score: temp === "Hot" ? 82 : temp === "Warm" ? 61 : temp === "Cold" ? 28 : 0,
        ownerId: owner, lostReason: stage === "Lost" ? "Joined competitor" : null,
        dormantRemindOn: stage === "Dormant" ? daysAhead(40) : null,
        createdAt: created, lastActivityAt: daysAgo(Math.min(age, 2)),
        nextFollowUpAt: nextFu, joinedEnrolmentId: null
      }],
      enrolments: [], payments: [],
      activities: [{ id: nid("a"), at: created, type: "enquiry", note: "Enquiry from " + source, actor: "system" }],
      tasks: [], exits: [], nameHistory: []
    };
    if (stage !== "New") person.activities.push({ id: nid("a"), at: daysAgo(Math.max(age - 1, 0)), type: "call", outcome: "Connected", note: "First contact", actor: owner || "ops" });
    people.push(person);
  });
  const students = [
    ["Ankit Verma", "9876500101", "CET", "Thane", "c1", "m1", "Active", 18, 14, 10, 7, 32000, 32000, 40],
    ["Shreya Kapoor", "9876500102", "CAT", "Vashi", "c2", "m1", "Onboarding", 4, 1, 8, 0, 45000, 15000, 10],
    ["Manav Desai", "9876500103", "CET", "Borivali", "c3", "m1", "Active", 16, 6, 10, 2, 30000, 15000, 25],
    ["Diya Kulkarni", "9876500104", "CET", "Thane", "c1", "m1", "Active", 20, 18, 12, 11, 28000, 28000, 50],
    ["Arjun Sethi", "9876500105", "CAT", "Online", "c2", "m1", "Active", 12, 11, 9, 8, 40000, 20000, 30],
    ["Nidhi Pawar", "9876500106", "CET", "Dadar", "c4", "m1", "Leftover", 24, 10, 8, 3, 25000, 25000, 70],
    ["Sahil Khan", "9876500107", "SNAP", "Vashi", "c2", "m1", "Active", 8, 7, 6, 5, 22000, 0, 15]
  ];
  students.forEach((s, i) => {
    const [name, mobile, exam, centre, owner, mentor, status, held, att, assigned, attempted, net, paid, joinDays] = s;
    const id = "s" + (i + 1);
    const leftover = status === "Leftover";
    const enrId = "en" + (i + 1);
    const person = {
      id, name, mobile, email: name.split(" ")[0].toLowerCase() + "@mail.com", city: centre,
      enquiries: [{
        id: "es" + (i + 1), personId: id, source: "Cetking.com", site: "Cetking.com",
        exam, attemptYear: "2026", graduation: "Passed", course: exam + " classroom",
        centre, mode: centre === "Online" ? "Online" : "Classroom",
        stage: "Joined", temperature: "Hot", score: 88, ownerId: owner,
        createdAt: daysAgo(joinDays + 8), lastActivityAt: daysAgo(1),
        nextFollowUpAt: null, joinedEnrolmentId: enrId, lostReason: null, dormantRemindOn: null
      }],
      enrolments: [{
        id: enrId, personId: id, enquiryId: "es" + (i + 1), course: exam + " 2026",
        batch: centre.slice(0, 3).toUpperCase() + "-" + exam + "-A",
        centre, mode: centre === "Online" ? "Online" : "Classroom",
        status: leftover ? "Completed" : status, joinedAt: daysAgo(joinDays), mentorId: mentor,
        validityEnd: leftover ? daysAgo(2) : daysAhead(80),
        leftoverAt: leftover ? daysAgo(2) : null, materialStatus: paid >= net ? "Dispatched" : "Pending"
      }],
      payments: [
        { id: nid("pay"), enrolmentId: enrId, amount: net, kind: "charge", dueAt: daysAgo(joinDays), paidAt: null, ref: "FEE" },
        ...(paid ? [{ id: nid("pay"), enrolmentId: enrId, amount: paid, kind: "receipt", dueAt: null, paidAt: daysAgo(joinDays - 1), ref: "RCPT-" + (100 + i) }] : [])
      ],
      activities: [
        { id: nid("a"), at: daysAgo(joinDays + 8), type: "enquiry", note: "Original enquiry", actor: "system" },
        { id: nid("a"), at: daysAgo(joinDays), type: "joined", note: "Admission confirmed", actor: owner }
      ],
      tasks: leftover ? [{ id: nid("t"), dueAt: daysAgo(1), completedAt: null, title: "Leftover college call", ownerId: mentor }] : [],
      exits: [],
      academic: {
        classesHeld: held, classesAttended: att, lastClassAt: daysAgo(leftover ? 20 : 1),
        testsAssigned: assigned, testsAttempted: attempted,
        lastTestAt: attempted ? daysAgo(leftover ? 18 : 2) : null,
        lastScore: attempted ? 70 + (i * 3) % 25 : null
      },
      nameHistory: []
    };
    people.push(person);
  });
  const dual = people.find(p => p.name === "Diya Kulkarni");
  if (dual) {
    dual.enquiries.push({
      id: "e-cat-diya", personId: dual.id, source: "XATKing", site: "XATKing",
      exam: "CAT", attemptYear: "2026", graduation: "Passed", course: "CAT classroom",
      centre: "Thane", mode: "Classroom", stage: "Contacted", temperature: "Hot",
      score: 80, ownerId: "c1", createdAt: daysAgo(2), lastActivityAt: daysAgo(0),
      nextFollowUpAt: daysAgo(0), joinedEnrolmentId: null, lostReason: null, dormantRemindOn: null
    });
  }
  const alumni = [
    ["Rhea Sen", "9876500201", "CET", "Thane", "Admitted", "JBIMS", "MMS", "student_update"],
    ["Kunal Ghosh", "9876500202", "CAT", "Vashi", "Dropped", "", "", "staff_close"],
    ["Aisha Khan", "9876500203", "CET", "Borivali", "Repeat-eligible", "", "", "staff_close"],
    ["Omkar Patil", "9876500204", "CET", "Dadar", "Not reachable", "", "", "staff_close"]
  ];
  alumni.forEach((a, i) => {
    const [name, mobile, exam, centre, type, college, course, path] = a;
    const id = "al" + (i + 1);
    const enrId = "ena" + (i + 1);
    people.push({
      id, name, mobile, email: name.split(" ")[0].toLowerCase() + "@mail.com", city: centre,
      enquiries: [{ id: "ea" + (i + 1), personId: id, source: "Referral", site: "Cetking.com", exam, attemptYear: "2025", graduation: "Passed", course: exam + " classroom", centre, mode: "Classroom", stage: "Joined", temperature: "Warm", score: 70, ownerId: "c1", createdAt: daysAgo(200), lastActivityAt: daysAgo(20), nextFollowUpAt: null, joinedEnrolmentId: enrId, lostReason: null, dormantRemindOn: null }],
      enrolments: [{ id: enrId, personId: id, enquiryId: "ea" + (i + 1), course: exam + " 2025", batch: "ALUM-" + exam, centre, mode: "Classroom", status: "Completed", joinedAt: daysAgo(180), mentorId: "m1", validityEnd: daysAgo(20), leftoverAt: daysAgo(20), materialStatus: "Dispatched" }],
      payments: [{ id: nid("pay"), enrolmentId: enrId, amount: 28000, kind: "receipt", paidAt: daysAgo(170), dueAt: null, ref: "OLD" }],
      activities: [{ id: nid("a"), at: daysAgo(15), type: "exit", note: "Closed as " + type, actor: "ops" }],
      tasks: [],
      academic: { classesHeld: 40, classesAttended: 32, lastClassAt: daysAgo(25), testsAssigned: 12, testsAttempted: 10, lastTestAt: daysAgo(22), lastScore: 81 },
      exits: [{ id: nid("x"), personId: id, enrolmentId: enrId, type, path, college, collegeCourse: course, admissionYear: "2026", declaredAt: daysAgo(12), spokeTo: path === "staff_close" ? "student" : "self", attempts: type === "Not reachable" ? 4 : 1, remarketOn: type === "Repeat-eligible" ? daysAhead(60) : null, note: type, closedBy: "ops" }],
      nameHistory: []
    });
  });
  return { people, currentUserId: "c1" };
};
