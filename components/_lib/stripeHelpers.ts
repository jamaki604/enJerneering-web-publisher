/**
 * Function to fetch the publishable key from the server.
 *
 * @function
 * @async
 * @returns {Promise<string | { error: string }>} - A promise that resolves with the publishable key or an error object.
 */
export async function handleFetchPublishableKey(): Promise<string | {}> {
  try {
    const response = await fetch(`http://localhost:3000/api/v1/stripe/config`);
    const responseData = await response.json();
    const { publishableKey } = responseData?.data;

    return publishableKey;
  } catch (error: any) {
    console.error(error);
    return {
      error: `There was an error fetching publishable key: ${error.message}`,
    };
  }
}

/**
 * Function to create a payment intent on the server.
 *
 * @function
 * @async
 * @param {Object} data - The data object containing payment intent details.
 * @returns {Promise<string | undefined>} - A promise that resolves with the client secret for the payment intent or
 * error object.
 */
export async function handleCreatePaymentIntent(
  data: object
): Promise<string | { error: string }> {
  try {
    const response = await fetch(`http://localhost:3000/api/v1/payments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const responseData = await response.json();
    const { paymentIntent } = responseData?.data;

    return paymentIntent?.clientSecret;
  } catch (error: any) {
    console.error(error);
    return {
      error: `There was an error creating a payment intent on the server: ${error.message}`,
    };
  }
}
