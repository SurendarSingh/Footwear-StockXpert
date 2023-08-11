export default function emailTemplate(link: string) {
  return `
    <div style="text-align: center;">
      <h1 style="font-size: 2rem; margin-bottom: 1rem;">Welcome to the <span style="color: #2D9CDB">Dev</span>Community!</h1>
      <p style="font-size: 1.2rem; margin-bottom: 1rem;">Please verify your email address by clicking the link below.</p>
      <a href="${link}" style="font-size: 1.2rem; margin-bottom: 1rem;">${link}</a>
      <p style="font-size: 1.2rem; margin-bottom: 1rem;">If you did not create an account, no further action is required.</p>
    </div>
  `;
}
