// import { describe, it, expect, vi } from 'vitest';
// import { fetchData } from '../main/index.js';

// // Mock Supabase client
// const mockSupabase = {
//   from: vi.fn().mockReturnThis(),
//   select: vi.fn().mockReturnThis(),
//   eq: vi.fn().mockReturnThis(),
//   single: vi.fn(),
//   limit: vi.fn(),
// };

// vi.mock('@supabase/supabase-js', () => ({
//   createClient: () => mockSupabase,
// }));

// describe('fetchData', () => {
//   it('should fetch data correctly for a valid projectId', async () => {
//     // Mock project data
//     mockSupabase.single.mockResolvedValueOnce({
//       data: {
//         projectId: '6ed47459-139a-4f39-ac04-f93765829206',
//         projectTitle: 'Test Project',
//         createdAt: '2022-01-01T00:00:00Z',
//         lastUpdated: '2022-01-02T00:00:00Z',
//       },
//       error: null,
//     });

//     // Mock element data (textBoxData and footerData)
//     mockSupabase.limit.mockResolvedValueOnce({
//       data: [
//         {
//           textBoxData: '{"content":"This is Placeholder Text (Testing)"}',
//           footerData: JSON.stringify({
//             copyRight: "© 202X. Powered by enJerneering.",
//             ctaButtonLabel: "Submit",
//             ctaButtonUrl: "/",
//             logo: "/img/enJerneering_black.png",
//             navigation: [
//               { href: "/", pageGroup: "Page group 1", title: "Page 1" },
//               { href: "/", pageGroup: "Page group 1", title: "Page 2" },
//               { href: "/", pageGroup: "Page group 1", title: "Page 3" },
//               { href: "/", pageGroup: "Page group 2", title: "Page 4" },
//               { href: "/", pageGroup: "Page group 2", title: "Page 5" },
//               { href: "/", pageGroup: "Page group 3", title: "Page 6" },
//               { href: "/", pageGroup: "Page group 3", title: "Page 7" },
//             ],
//             polices: [
//               { title: "Privacy Policy", url: "/" },
//               { title: "Terms & Conditions", url: "/" },
//               { title: "Legal Information", url: "/" },
//             ],
//             showContentFlags: {
//               copyRight: "on",
//               slogan: "on",
//               socials: "on",
//             },
//             slogan:
//               "Lorem ipsum dolor sit amet consectetur. Nunc tincidunt pretium ut duis rhoncus. Et pulvinar aliquam malesuada.",
//             socials: [
//               { icon: "pi-linkedin", id: "f00b7e65-734b-44ff-9e21-7f8550889676", name: "linkedin", url: "/" },
//               { icon: "pi-github", id: "c23dbcd9-04ac-460f-b41a-1a3f34972b2e", name: "github", url: "/" },
//               { icon: "pi-instagram", id: "10fdd9b3-2422-40fa-9440-7c4eef8fa19f", name: "instagram", url: "/" },
//               { icon: "pi-facebook", id: "b451d466-ebc1-4656-acbd-176742c19d39", name: "facebook", url: "/" },
//             ],
//           }),
//         },
//       ],
//       error: null,
//     });

//     // Mock service data
//     mockSupabase.select.mockResolvedValueOnce({
//       data: [
//         { serviceId: '1', serviceName: 'Test Service', serviceDescription: 'Description' },
//       ],
//       error: null,
//     });

//     const projectId = '6ed47459-139a-4f39-ac04-f93765829206';
//     const result = await fetchData(projectId);

//     // Assertions for project data
//     expect(result.projectData.projectId).toBe('6ed47459-139a-4f39-ac04-f93765829206');
//     expect(result.projectData.projectTitle).toBe('Mock Project Title');

//     // Assertions for textbox data
//     expect(result.textboxData).toEqual({ content: 'This is Placeholder Text (Testing)' });

//     // Assertions for footer data
//     expect(result.footerData).toEqual({
//       copyRight: "© 202X. Powered by enJerneering.",
//       ctaButtonLabel: "Submit",
//       ctaButtonUrl: "/",
//       logo: "/img/enJerneering_black.png",
//       navigation: [
//         { href: "/", pageGroup: "Page group 1", title: "Page 1" },
//         { href: "/", pageGroup: "Page group 1", title: "Page 2" },
//         { href: "/", pageGroup: "Page group 1", title: "Page 3" },
//         { href: "/", pageGroup: "Page group 2", title: "Page 4" },
//         { href: "/", pageGroup: "Page group 2", title: "Page 5" },
//         { href: "/", pageGroup: "Page group 3", title: "Page 6" },
//         { href: "/", pageGroup: "Page group 3", title: "Page 7" },
//       ],
//       polices: [
//         { title: "Privacy Policy", url: "/" },
//         { title: "Terms & Conditions", url: "/" },
//         { title: "Legal Information", url: "/" },
//       ],
//       showContentFlags: {
//         copyRight: "on",
//         slogan: "on",
//         socials: "on",
//       },
//       slogan:
//         "Lorem ipsum dolor sit amet consectetur. Nunc tincidunt pretium ut duis rhoncus. Et pulvinar aliquam malesuada.",
//       socials: [
//         { icon: "pi-linkedin", id: "f00b7e65-734b-44ff-9e21-7f8550889676", name: "linkedin", url: "/" },
//         { icon: "pi-github", id: "c23dbcd9-04ac-460f-b41a-1a3f34972b2e", name: "github", url: "/" },
//         { icon: "pi-instagram", id: "10fdd9b3-2422-40fa-9440-7c4eef8fa19f", name: "instagram", url: "/" },
//         { icon: "pi-facebook", id: "b451d466-ebc1-4656-acbd-176742c19d39", name: "facebook", url: "/" },
//       ],
//     });
//   });

//   it('should return an error if projectId is missing', async () => {
//     const result = await fetchData(null);

//     expect(result.error).toBeDefined();
//     expect(result.error.message).toBe('Invalid or missing Project ID');
//   });
// });
